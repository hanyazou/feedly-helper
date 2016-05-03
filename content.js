$(document).ready(function(){

    console.log("#### Hello feedly! This is helper.");

    chrome.extension.sendRequest( { action: "openByMe?" },
	function(openByMe) {
	    console.log("#### openByMe?: " + openByMe);
	    if (openByMe) {
		document.onkeyup = function(event) {
		    console.log("#### key up: " + event.keyCode);
		    if (event.keyCode==13 ||
			event.keyCode==76) { // return key or 'l' key
			    // <a href="..." class="websiteCallForAction">Visit Website</a>
			    var link = $("a.websiteCallForAction").attr("href");
			if (link) {
  			    console.log("#### open: url = " + link);
			    chrome.extension.sendRequest( { action: "open", url: link } );
			}
		    }
		    if (event.keyCode==74) { // 'j' key
  			window.scrollBy(0, window.innerHeight/3);
		    }
		    if (event.keyCode==75) { // 'k' key
  			window.scrollBy(0, -window.innerHeight/3);
		    }
		    if (event.keyCode==72) { // 'h' key
  			console.log("#### back");
			chrome.extension.sendRequest( { action: "back" } );
		    }
		}
	    }
	});

});
