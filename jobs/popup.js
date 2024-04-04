$(function(){
    document.getElementById('start').addEventListener('click', function(i, val){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage( tabs[0].id, {message:"startscraping",tabId:tabs[0].id});
        });
    })

});