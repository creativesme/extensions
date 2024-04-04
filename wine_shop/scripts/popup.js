document.getElementById('start').addEventListener('click', function(i, val){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    	chrome.tabs.sendMessage( tabs[0].id, {message:"startscraping",tabId:tabs[0].id});
	});
})
document.getElementById('stop').addEventListener('click', function(i, val){
	$('.spinner').hide();
	$('#stop').hide();
	$('#start').hide();
	$('#download').show();
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    	chrome.tabs.sendMessage( tabs[0].id, {message:"stopscraping"});
	});
});
document.getElementById('download').addEventListener('click', function(i, val){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    	chrome.tabs.sendMessage( tabs[0].id, {message:"downloadscraping"});
	});
});

$(document).ready(function() {
	$('.spinner').hide();
	$('#start').show();
	$('#stop').hide();
	$('#download').show();
});

