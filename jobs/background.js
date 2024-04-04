'use strict';

chrome.runtime.onInstalled.addListener(function() {
  	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'www.linkedin.com', schemes: ['https'] },
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    // if(request.message == 'stopscraping'){
    //     chrome.tabs.remove(request.tabId)
    // }
	
    if(request.message == "openurl") {
        let newURL = request.url;
        chrome.tabs.create({ url: newURL, active:true}, function(tab){
            setInterval(function(){
                chrome.tabs.sendMessage( tab.id, {message:"getPageData",tabId:tab.id});
            },3000)
        });
    }
});