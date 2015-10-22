// @TODO
// ref - http://www.w3.org/TR/performance-timeline-2/, http://www.w3.org/TR/user-timing/
// https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/timing/&sq=package:chromium&type=cs

_wrap_( function( global ) {
	var hasPerformance = global.performance;

	if ( !hasPerformance ) {
		global.performance = {};
	}

	// now
	var startOffset =  new global.Date().getTime();
	global.performance.now = function() {
		return new global.Date().getTime() - startOffset;
	}
} );

// performance.now();

// User Timing
// performance.mark();
// performance.clearMarks();
// performance.measure();
// performance.clearMeasures();

// Performance Timeline
// performance.getEntries();
// performance.getEntriesByType();
// performance.getEntriesByName();

function _wrap_ ( fp ) {
	fp( window );
}
