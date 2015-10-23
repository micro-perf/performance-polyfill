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
		performanceStoreObj = cache(mock);
	});

	it("should be set performanceEntryList and performanceEntryHash.", function() {
		// Given
		// When
		mock.performance.mark("test");
		// Then
		expect(performanceStoreObj.performanceEntryList.length).toBe(1);
		expect(performanceStoreObj.performanceEntryHash.test.constructor)
			.toBe(performanceStoreObj.PerformanceEntry);

	});

	it("should be store info of performanceEntry.", function() {
		// Given
		var performanceEntry;
		// When
		mock.performance.mark("something");
		performanceEntry = performanceStoreObj.performanceEntryHash.something;
		// Then
		expect(performanceEntry.name).toBe("something");
		expect(performanceEntry.entryType).toBe("mark");
		expect(performanceEntry.startTime).toBe(1);
		expect(performanceEntry.duration).toBe(0);

	});
});
