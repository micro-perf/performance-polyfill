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