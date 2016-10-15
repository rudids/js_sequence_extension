var watchType;
var modCount = 0;
var theme;

chrome.storage.sync.get(['theme'], function(items) {
    if (typeof items.theme !== 'undefined') theme = items.theme;
});

var drawDiagram = function(id, elem) {
	$(elem).attr("id", id);
	$(elem).attr("class", "jsseqdiagram");
	var diagram = Diagram.parse($(elem).find(":first-child").text());
	$(elem).find(":first-child").remove();
	diagram.drawSVG(id, {'theme': theme});
	chrome.runtime.sendMessage({type: "qa_event", qaEventData: ['_trackEvent', 'Diagram', 'Draw', 'Sequence Diagram Rendered']});
};

var drawDiagrams = function() {
	$("[lang='jsseq']").each(function(index, diag){
		drawDiagram("jsseqdiagram"+index, diag);
	});
};

var setupWatch = function() {
	var observer = new MutationSummary({
		callback: function(summaries) {
			$(summaries[0].added).each(function(index, diag) {
				modCount++;
				drawDiagram("mod_jsseqdiagram"+modCount, diag);
			});
		},
		queries: [{ element: '[lang="jsseq"]' }]
	});
};

$(document).ready(function() {
	setupWatch();
	drawDiagrams();
});
