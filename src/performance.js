// @TODO
// ref - http://www.w3.org/TR/performance-timeline-2/, http://www.w3.org/TR/user-timing/
// https://code.google.com/p/chromium/codesearch#chromium/
// src/third_party/WebKit/Source/core/timing/&sq=package:chromium&type=cs

_wrap_( function( global ) {
	var hasPerformance = global.performance;

	if ( !hasPerformance ) {
		global.performance = {};
	}

	// navigationStart
	var navigationStart =  new global.Date().getTime();

	var performanceEntryHash = {};
	var performanceEntryList = [];

	function performanceReset() {
		performanceEntryHash = {};
		performanceEntryList = [];
	}

	/**
	 * The Performance.now() method returns a DOMHighResTimeStamp, measured in milliseconds,
	 * accurate to one thousandth of a millisecond.
	 * @name performance.now
	 * @return {DOMHighResTimeStamp} now
	 * @see http://www.w3.org/TR/hr-time/#dom-performance-now
	 */
	global.performance.now = function() {
		return new global.Date().getTime() - navigationStart;
	}

	/**
	 * @name PerformanceEntry
	 * @property {DOMString} name
	 * @property {DOMString} entryType - mark, measure, navigation, frame, resource, server
	 * @property {DOMHighResTimeStamp} startTime
	 * @property {DOMHighResTimeStamp} duration
	 * @see http://www.w3.org/TR/performance-timeline/#performanceentry
	 */
	function PerformanceEntry( name, entryType, startTime, duration ) {
		this.name = name;
		this.entryType = entryType;
		this.startTime = startTime;
		this.duration = duration;
	 }

	/**
	 * This method stores a timestamp with the associated name (a "mark").
	 * @name performance.mark
	 * @param {String} name
	 * @see http://www.w3.org/TR/user-timing/#dom-performance-mark
	 */
	global.performance.mark = function( name ) {
		var performanceEntry = new PerformanceEntry( name, "mark", global.performance.now(), 0 );
		performanceEntryList.push( performanceEntry );
		performanceEntryHash[ name ] = performanceEntry;
	}

	/**
	 * Removes marks and their associated time values.
	 * @name performance.clearMarks
	 * @param {string} [markName] - markName
	 * @see http://www.w3.org/TR/user-timing/#dom-performance-clearmarks
	 */
	global.performance.clearMarks = function( markName ) {
		if ( !markName ) {
			performanceReset();
		} else if ( markName ) {
			var reEntryList = [];
			for ( var i = 0; i < performanceEntryList.length; i++ ) {
				if ( performanceEntryList[i].name != markName ) {
					reEntryList.push( performanceEntryList[i] );
				}
			};
			performanceEntryList = reEntryList;
			performanceEntryHash[ markName ] = undefined;
		}
	}

	return function() {
		return {
			performanceEntryHash: performanceEntryHash,
			performanceEntryList: performanceEntryList,
			PerformanceEntry: PerformanceEntry
		};
	};
} );

// performance.now();

// User Timing
// performance.measure();
// performance.clearMeasures();

// Performance Timeline
// performance.getEntries();
// performance.getEntriesByType();
// performance.getEntriesByName();
