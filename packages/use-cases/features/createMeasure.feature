Feature: Add Measure

	A measure is the value of a _dimension_ at a specific point in time.

Scenario: Create a measure
	When a measure is created
	Then the measure's value should be 123
