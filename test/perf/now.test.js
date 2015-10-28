describe("performance.now", function() {
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