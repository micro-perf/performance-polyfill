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

	it("The clearMarks have to reset only mark type.", function() {
		// Given
		var info;
		var entryList;
		var entryHash;
		var performanceEntry;
		// When
		mock.performance.measure("measure");
		mock.performance.clearMarks( );

		info = getPerformanceInfo();
		entryList = info.performanceEntryList;
		entryHash = info.performanceEntryHash;
		// Then
		expect(entryList.length).toBe(1);
		expect(entryHash["measure"]).toBeDefined();
	});

});