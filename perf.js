// @TODO
// ref - http://www.w3.org/TR/performance-timeline-2/, http://www.w3.org/TR/user-timing/
// https://code.google.com/p/chromium/codesearch#chromium/
// src/third_party/WebKit/Source/core/timing/PerformanceUserTiming.cpp

_wrap_( function( global ) {
	var hasPerformance = global.performance;

	if ( !hasPerformance ) {
		global.performance = {};
	}

	// navigationStart
	var navigationStart =  new global.Date().getTime();

	var performanceEntryHash = {};
	var performanceEntryList = [];

	function performanceReset( type ) {
		newEntryHash = {};
		newEntryList = [];
		var entry;
		for ( var i = 0, l = performanceEntryList.length; i < l; i++ ) {
			entry = performanceEntryList[i];
			if ( entry.entryType !== type ) {
				newEntryHash[ entry.name ] = entry;
				newEntryList.push( entry );
			}
		}

		performanceEntryHash = newEntryHash;
		performanceEntryList = newEntryList;
	}

	var RestrictedKeyMap = {
		"navigationStart": true,
		"unloadEventStart": true,
		"unloadEventEnd": true,
		"redirectStart": true,
		"redirectEnd": true,
		"fetchStart": true,
		"domainLookupStart": true,
		"domainLookupEnd": true,
		"connectStart": true,
		"connectEnd": true,
		"secureConnectionStart": true,
		"requestStart": true,
		"responseStart": true,
		"responseEnd": true,
		"domLoading": true,
		"domInteractive": true,
		"domContentLoadedEventStart": true,
		"domContentLoadedEventEnd": true,
		"domComplete": true,
		"loadEventStart": true,
		"loadEventEnd": true
	};

	function removeEntry( type, name ) {
		if ( name === undefined ) {
			performanceReset( type );
		} else if ( name ) {
			var reEntryList = [];
			var entry;
			for ( var i = 0; i < performanceEntryList.length; i++ ) {
				entry = performanceEntryList[i];
				if ( entry.name != name || entry.entryType !== type ) {
					reEntryList.push( entry );
				}
			};
			performanceEntryList = reEntryList;
			entry = performanceEntryHash[ name ];
			if ( entry && entry.entryType === type ) {
				performanceEntryHash[ name ] = undefined;
			}
		}
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
		removeEntry( "mark", markName );
	}

	/**
	 * This method stores the DOMHighResTimeStamp duration between two marks along with the associated name (a "measure").
	 * @name performance.measure
	 * @param {string} measureName - measureName
	 * @param {string} [startMark] - startMark
	 * @param {string} [endMark] - endMark
	 * @see http://www.w3.org/TR/user-timing/#dom-performance-measure
	 */
	global.performance.measure = function( measureName, startMark, endMark ) {
		var isUndefinedStartMark = startMark === undefined;
		var isUndefinedEndMark = endMark === undefined;
		var duration = 0;
		var currentTime = global.performance.now();

		var startTime = 0;
		var endTime = 0;

		if ( isUndefinedStartMark ) {
			startTime = 0;
		} else if ( performanceEntryHash[startMark] ) {
			startTime = performanceEntryHash[startMark].startTime;
		} else {

			// @TODO #11
		}

		if ( isUndefinedEndMark ) {
			endTime = currentTime;
		} else if ( performanceEntryHash[endMark] ) {
			endTime = performanceEntryHash[endMark].startTime;
		} else {

			// @TODO #11
		}

		var performanceEntry = new PerformanceEntry( measureName, "measure", currentTime, endTime - startTime );
		performanceEntryList.push( performanceEntry );
		performanceEntryHash[ measureName ] = performanceEntry;
	}

	/**
	 * Removes measures and their associated time values.
	 * @name performance.clearMeasures
	 * @param {string} [measureName] - measureName
	 * @see http://www.w3.org/TR/user-timing/#dom-performance-clearmeasures
	 */
	global.performance.clearMeasures = function( measureName ) {
		removeEntry( "measure", measureName );
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
// performance.clearMeasures();

// Performance Timeline
// performance.getEntries();
// performance.getEntriesByType();
// performance.getEntriesByName();

function _wrap_ ( fp ) {
	fp( window );
}
