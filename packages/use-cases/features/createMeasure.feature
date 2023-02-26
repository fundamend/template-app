Feature: Create Measure

	A measure is the value of a dimension at a specific point in time.

Scenario: Create a measure with a dimension and a value
	When a measure for the dimension 'testDimension' with the value 123 is created
	Then the measure should be stored
	And the measure's dimension should be 'testDimension'
	And the measure's value should be 123
