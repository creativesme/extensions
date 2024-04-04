'use strict';

chrome.runtime.onInstalled.addListener(function() {
  	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'www.wine-searcher.com', schemes: ['https'] },
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.message == 'stopscraping'){
        chrome.tabs.remove(request.tabId)
    }
	
    if(request.message == "openurl") {
        let i = request.count+1;
        let newURL = request.url;
        chrome.tabs.create({ url: newURL, active:true}, function(tab){
            if(request.prevTabId != null){
                console.log(request.prevTabId)
                chrome.tabs.remove(request.prevTabId)
            }
            // Why do you query, when tab is already given?
            // chrome.tabs.executeScript({file:"/js/jquery.min.js"}, function() {
            //     // This executes only after jQuery has been injected and executed
            //     chrome.tabs.executeScript({file:"content.js"}, function() {
            //         // This executes only after your content script executes
                    setInterval(function(){
                        chrome.tabs.sendMessage( tab.id, {message:"getPageData",tabId:tab.id,count:i});
                    },3000)
            //     });
            // });   
        });
    }
});