Feature: Create Dimension

	A dimension groups measures with a common unit

Scenario: Create a dimension with a name
	When a dimension with the name 'test' is created
	Then the dimension should be stored
	And the dimension's name should be 'test'
