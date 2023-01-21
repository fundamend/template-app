Feature: Measure

	A measure is the value of a _dimension_ at a specific point in time.

Scenario: Create a measure with id
	When a measure with id "1" is created
	Then its id should be "1"

Scenario: Create a measure without id
	When a measure is created without id
	Then its id should be undefined

Scenario: Get details from a new measure
	Given a measure created at "2000-01-01T00:00:00.000Z"
	Then its timestamp should be "2000-01-01T00:00:00.000Z"
	And its id should be undefined
	And its value should be undefined
	And its dimension should be undefined

Scenario: Get details from a measure that has details
	Given a measure created at "2000-01-01T00:00:00.000Z"
	When its timestamp is set to "1999-12-12T12:12:12.123Z"
	And its value is set to 1
	And its dimension is set to "test"
	Then its timestamp should be "1999-12-12T12:12:12.123Z"
	And its value should be 1
	And its dimension should be "test"
