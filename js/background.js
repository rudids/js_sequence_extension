var manifest = chrome.runtime.getManifest();
var oldChromeVersion = !chrome.runtime;
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-15784844-2']);
_gaq.push(['_trackPageview']);

var loadTracking = function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
};

var onStart = function() {
	_gaq.push(['_trackEvent', 'System', 'Start', 'Extension Started']);
};

var onInstall = function(details) {
    switch(details.reason) {
        case "install":
			_gaq.push(['_trackEvent', 'System', 'Install', 'Extension Installed']);
			_gaq.push(['_trackEvent', 'System', 'InstallVersion', manifest.version]);
		break;
        case "install":
			_gaq.push(['_trackEvent', 'System', 'Update', 'Extension Installed']);
			_gaq.push(['_trackEvent', 'System', 'UpdateVersion', manifest.version]);
			_gaq.push(['_trackEvent', 'System', 'PreviousVersion', details.previousVersion]);
		break;
        case "chrome_update":
			_gaq.push(['_trackEvent', 'System', 'Chrome Update', 'Chrome Updated']);
        break;
    }
};

loadTracking();

if (oldChromeVersion) {
	_gaq.push(['_trackEvent', 'System', 'Unsupported', 'Missing Runtime APIs, Old Chrome Version']);
} else {
	chrome.runtime.onInstalled.addListener(onInstall);
	chrome.runtime.onStartup.addListener(onStart);
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "qa_event":
            _gaq.push(request.qaEventData);
        break;
    }
    return true;
});