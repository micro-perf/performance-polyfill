describe("performance.getEntries", function() {
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

	it("If Parameter is empty then it return all entry object list.", function() {
		// Given
		mock.performance.mark("foo");
		mock.performance.measure("bar");
		// When
		var entryList = mock.performance.getEntries();
		// Then
		expect(entryList.length).toBe(2);
		expect(entryList[0].name).toBe("foo");
		expect(entryList[1].name).toBe("bar");

	});

	it("If Parameter set name then it return filtered entry object list.", function() {
		// Given
		mock.performance.mark("foo");
		mock.performance.measure("bar");
		// When
		var entryList = mock.performance.getEntries({"name":"foo"});
		// Then
		expect(entryList.length).toBe(1);
		expect(entryList[0].name).toBe("foo");
	});

	it("If Parameter set entryType then it return filtered entry object list.", function() {
		// Given
		mock.performance.mark("foo");
		mock.performance.measure("bar");
		// When
		var entryList = mock.performance.getEntries({"entryType":"measure"});
		// Then
		expect(entryList.length).toBe(1);
		expect(entryList[0].name).toBe("bar");
	});

	it("If Parameter set name and entryType then it return filtered entry object list.", function() {
		// Given
		mock.performance.mark("bar");
		mock.performance.mark("foo");
		mock.performance.measure("bar");
		// When
		var entryList = mock.performance.getEntries({
			"entryType":"mark",
			"name":"bar"
		});
		// Then
		expect(entryList.length).toBe(1);
		expect(entryList[0].entryType).toBe("mark");
		expect(entryList[0].name).toBe("bar");
		expect(entryList[0].startTime).toBe(1);
	});
});

describe("performance.getEntriesByName", function() {
	var mock
	
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

	it("If Parameter set name then it return filtered entry object list.", function() {
		// Given
		mock.performance.mark("foo");
		mock.performance.measure("bar");
		// When
		var entryList = mock.performance.getEntriesByName("foo");
		// Then
		expect(entryList.length).toBe(1);
		expect(entryList[0].name).toBe("foo");
	});

	it("If Parameter set name and entryType then it return filtered entry object list.", function() {
		// Given
		mock.performance.mark("bar");
		mock.performance.mark("foo");
		mock.performance.measure("bar");
		// When
		var entryList = mock.performance.getEntriesByName("bar","mark");
		// Then
		expect(entryList.length).toBe(1);
		expect(entryList[0].entryType).toBe("mark");
		expect(entryList[0].name).toBe("bar");
		expect(entryList[0].startTime).toBe(1);
	});
});

describe("performance.getEntriesByType", function() {
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

	it("If Parameter set entryType then it return filtered entry object list.", function() {
		// Given
		mock.performance.mark("foo");
		mock.performance.measure("bar");
		// When
		var entryList = mock.performance.getEntriesByType("measure");
		// Then
		expect(entryList.length).toBe(1);
		expect(entryList[0].name).toBe("bar");
	});
});