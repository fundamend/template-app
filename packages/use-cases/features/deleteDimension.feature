Feature: Delete Dimension

Scenario: Delete an existing dimension
	When an existing dimension is deleted
	Then the dimension should be removed from storage
