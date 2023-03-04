Feature: Measure

	A measure is the value of a _dimension_ at a specific point in time.

Scenario: Get details from a new measure
	Given a measure created at "2000-01-01T00:00:00.000Z"
	Then the measure's timestamp should be "2000-01-01T00:00:00.000Z"
	And the measure's id should be undefined
	And the measure's value should be undefined
	And the measure's dimension should be undefined

Scenario: Get details from a measure that has details
	Given a measure created at "2000-01-01T00:00:00.000Z"
	When the measure's timestamp is set to "1999-12-12T12:12:12.123Z"
	And the measure's id is set to "test"
	And the measure's value is set to 1
	And the measure's dimension is set to "test"
	Then the measure's timestamp should be "1999-12-12T12:12:12.123Z"
	And the measure's id should be "test"
	And the measure's value should be 1
	And the measure's dimension should be "test"
