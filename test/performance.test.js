describe("performance.now", function() {
	var mock = {
		count : 0,
		Date : function(){
			this.getTime = function(){
				mock.count++;
				return mock.count;
			}
		}
	};
	
	beforeEach(function() {
		mock.count = 0;
		cache(mock);
	});

	it("should be now time.", function() {
		// Given
		// When
		var expected = mock.performance.now();
		// Then
		expect(expected).toBe(1);

		// Given
		// When
		var expected = mock.performance.now();
		// Then
		expect(expected).toBe(2);
	});
});

describe("performance.mark", function() {
	var mock = {
		count : 0,
		Date : function(){
			this.getTime = function(){
				mock.count++;
				return mock.count;
			}
		}
	};
	
	beforeEach(function() {
		mock.count = 0;
		getPerformanceInfo = cache(mock);
	});

	it("should be set performanceEntryList and performanceEntryHash.", function() {
		// Given
		var info;
		var entryList;
		var entryHash;
		// When
		mock.performance.mark("test");

		info = getPerformanceInfo();
		entryList = info.performanceEntryList;
		entryHash = info.performanceEntryHash;
		// Then
		expect(entryList.length).toBe(1);
		expect(entryHash.test.constructor).toBe(info.PerformanceEntry);

	});

	it("should be store info of performanceEntry.", function() {
		// Given
		var info;
		var entryList;
		var entryHash;
		var performanceEntry;
		// When
		mock.performance.mark("something");

		info = getPerformanceInfo();
		entryHash = info.performanceEntryHash;
		performanceEntry = entryHash.something;
		// Then
		expect(performanceEntry.name).toBe("something");
		expect(performanceEntry.entryType).toBe("mark");
		expect(performanceEntry.startTime).toBe(1);
		expect(performanceEntry.duration).toBe(0);

	});
});


describe("performance.clearMarks", function() {
	var mock = {
		count : 0,
		Date : function(){
			this.getTime = function(){
				mock.count++;
				return mock.count;
			}
		}
	};
	
	beforeEach(function() {
		mock.count = 0;
		getPerformanceInfo = cache(mock);
		mock.performance.mark("something");
	});

	it("If the markName argument is not specified, this method removes all marks and their associated DOMHighResTimeStamp time values.", function() {
		// Given
		var info;
		var entryList;
		var entryHash;
		var performanceEntry;		
		// When
		mock.performance.clearMarks();

		info = getPerformanceInfo();
		entryList = info.performanceEntryList;
		entryHash = info.performanceEntryHash;
		// Then
		expect(entryList).toEqual([]);
		expect(entryHash).toEqual({});
	});

	it("If the markName argument is specified, this method removes all DOMHighResTimeStamp time values for the given mark name.", function() {
		// Given
		var info;
		var entryList;
		var entryHash;
		var performanceEntry;
		mock.performance.mark("something2");	
		// When
		mock.performance.clearMarks("something");

		info = getPerformanceInfo();
		entryList = info.performanceEntryList;
		entryHash = info.performanceEntryHash;
		// Then
		expect(entryList.length).toBe(1);
		expect(entryHash["something"]).not.toBeDefined();
	});

	it("If the markName argument is specified but the specified markName does not exist, this method will do nothing.", function() {
		// Given
		var info;
		var entryList;
		var entryHash;
		var performanceEntry;
		// When
		mock.performance.clearMarks("something2");

		info = getPerformanceInfo();
		entryList = info.performanceEntryList;
		entryHash = info.performanceEntryHash;
		// Then
		expect(entryList.length).toBe(1);
		expect(entryHash["something"]).toBeDefined();
	});

});

describe("performance.measure", function() {
	var mock = {
		count : 0,
		Date : function(){
			this.getTime = function(){
				mock.count++;
				return mock.count;
			}
		}
	};
	
	beforeEach(function() {
		mock.count = 0;
		getPerformanceInfo = cache(mock);
	});

	it("If neither the startMark nor the endMark argument is specified, measure() will store the duration as a DOMHighResTimeStamp from navigationStart to the current time", function() {
		// Given
		var info;
		var entryList;
		var entryHash;
		var performanceEntry;
		// When
		mock.performance.measure("test");
		info = getPerformanceInfo();
		entryList = info.performanceEntryList;
		entryHash = info.performanceEntryHash;
		performanceEntry = entryHash["test"];
		// Then
		expect(entryList.length).toBe(1);
		expect(performanceEntry).toBeDefined();
		expect(performanceEntry.name).toBe("test");
		expect(performanceEntry.entryType).toBe("measure");
		expect(performanceEntry.startTime).toBe(1);
		expect(performanceEntry.duration).toBe(1);
		
	});
	it("If the startMark argument is specified, but the endMark argument is not specified, measure() will store the duration as a DOMHighResTimeStamp from the most recent occurrence of the start mark to the current time.", function() {
		// Given
		var info;
		var entryList;
		var entryHash;
		var performanceEntry;
		mock.performance.mark("start_mark");
		new mock.Date().getTime();
		new mock.Date().getTime();
		// When
		mock.performance.measure("test","start_mark");
		info = getPerformanceInfo();
		entryList = info.performanceEntryList;
		entryHash = info.performanceEntryHash;
		performanceEntry = entryHash["test"];
		// Then
		expect(entryList.length).toBe(2);
		expect(performanceEntry).toBeDefined();
		expect(performanceEntry.name).toBe("test");
		expect(performanceEntry.entryType).toBe("measure");
		expect(performanceEntry.startTime).toBe(4);
		expect(performanceEntry.duration).toBe(3);
	});
	it("If both the startMark and endMark arguments are specified, measure() will store the duration as a DOMHighResTimeStamp from the most recent occurrence of the start mark to the most recent occurrence of the end mark.", function() {
		// Given
		var info;
		var entryList;
		var entryHash;
		var performanceEntry;
		mock.performance.mark("start_mark");
		new mock.Date().getTime();
		new mock.Date().getTime();
		mock.performance.mark("end_mark");
		new mock.Date().getTime();
		new mock.Date().getTime();
		// When
		mock.performance.measure("test","start_mark","end_mark");
		info = getPerformanceInfo();
		entryList = info.performanceEntryList;
		entryHash = info.performanceEntryHash;
		performanceEntry = entryHash["test"];
		// Then
		expect(entryList.length).toBe(3);
		expect(performanceEntry).toBeDefined();
		expect(performanceEntry.name).toBe("test");
		expect(performanceEntry.entryType).toBe("measure");
		expect(performanceEntry.startTime).toBe(7);
		expect(performanceEntry.duration).toBe(3);
	});

});