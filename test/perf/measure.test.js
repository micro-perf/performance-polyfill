describe("performance.measure", function() {
	var mock;
	
	beforeEach(function() {
		mock = {
			count : 0,
			Date : function(){
				this.getTime = function(){
					mock.count++;
					return mock.count;
				}
			}
		};
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

	it("Throws a exception if the start mark does not exist.", function(){
		// Given
		var notExistMark = "foo";
		mock.performance.mark("start_mark");
		// When
		// Then
		expect(function(){
				mock.performance.measure("test", notExistMark);
		}).toThrowError("The mark '" + notExistMark + "' does not exist.");
	});

	it("Throws a exception if the end mark does not exist.", function(){
		// Given
		var notExistMark = "foo";
		mock.performance.mark("start_mark");
		// When
		// Then
		expect(function(){
				mock.performance.measure("test", "start_mark", notExistMark);
		}).toThrowError("The mark '" + notExistMark + "' does not exist.");
	});

});

describe("performance.clearMeasures", function() {
	var mock;
	
	beforeEach(function() {
		mock = {
			count : 0,
			Date : function(){
				this.getTime = function(){
					mock.count++;
					return mock.count;
				}
			}
		};
		getPerformanceInfo = cache(mock);
		mock.performance.measure("something");
	});

	it("If the measureName argument is not specified, this method removes all measures and their associated DOMHighResTimeStamp durations.", function() {
		// Given
		var info;
		var entryList;
		var entryHash;
		var performanceEntry;		
		// When
		mock.performance.clearMeasures();

		info = getPerformanceInfo();
		entryList = info.performanceEntryList;
		entryHash = info.performanceEntryHash;
		// Then
		expect(entryList).toEqual([]);
		expect(entryHash).toEqual({});
	});

	it("If the measureName argument is specified, this method removes all DOMHighResTimeStamp durations for the given measure name.", function() {
		// Given
		var info;
		var entryList;
		var entryHash;
		var performanceEntry;
		mock.performance.measure("something2");
		// When
		mock.performance.clearMeasures("something");

		info = getPerformanceInfo();
		entryList = info.performanceEntryList;
		entryHash = info.performanceEntryHash;
		// Then
		expect(entryList.length).toBe(1);
		expect(entryHash["something"]).not.toBeDefined();
	});

	it("If the measureName argument is specified but the specified measureName does not exist, this method will do nothing.", function() {
		// Given
		var info;
		var entryList;
		var entryHash;
		var performanceEntry;
		// When
		mock.performance.clearMeasures("something2");

		info = getPerformanceInfo();
		entryList = info.performanceEntryList;
		entryHash = info.performanceEntryHash;
		// Then
		expect(entryList.length).toBe(1);
		expect(entryHash["something"]).toBeDefined();
	});

	it("The clearMarks have to reset only measure type.", function() {
		// Given
		var info;
		var entryList;
		var entryHash;
		var performanceEntry;
		// When
		mock.performance.mark("mark");
		mock.performance.clearMeasures();

		info = getPerformanceInfo();
		entryList = info.performanceEntryList;
		entryHash = info.performanceEntryHash;
		// Then
		expect(entryList.length).toBe(1);
		expect(entryHash["mark"]).toBeDefined();
	});

});