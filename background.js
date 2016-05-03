(function() {

console.log("#### background.js: loaded");

$(document).ready(function() {
    chrome.extension.onRequest.addListener(onRequest);
    console.log("#### background.js: request listener was added");
});
    
var openByMe;	
var onRequest = function(request, sender, callback) {
    console.log("#### background.js: ", request.action);
    console.log("#### sendar tab id=" + sender.tab.id);
    if (senderIsFeedly = sender.url.match(/^https:\/\/feedly.com\/.*/)) {
	console.log("#### URL=" + senderIsFeedly);
    }
    if (request.action == 'open') {
	chrome.tabs.create(
	    { url: request.url, openerTabId: sender.tab.id, active: true },
	    function(tab) {
		console.log("#### background.js: create tab id=" + tab.id);
		openByMe = tab;
	    });
    }
    if (request.action == 'back' && !senderIsFeedly) {
	console.log("#### background.js: close tab id =  " + sender.tab.id);
	chrome.tabs.remove(sender.tab.id);
    }
    if (request.action == 'openByMe?') {
	if (senderIsFeedly) {
	    callback(true);
	}
	if (openByMe && sender.tab.id == openByMe.id) {
	    console.log("#### sendar tab id matched");
	    callback(true);
	}
	callback(false);
    }
}

})();
