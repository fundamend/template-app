Feature: Dimension

	A dimension groups measures with a common unit

Scenario: Get details from a new dimension
	Given a dimension is created
	Then the dimension's id should be undefined
	And the dimension's name should be undefined

Scenario: Get details from a dimension that has details
	Given a dimension is created
	When the dimension's id is set to "test"
	And the dimension's name is set to "test"
	Then the dimension's id should be "test"
	And the dimension's name should be "test"
