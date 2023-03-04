Feature: Create Milestone

Scenario: Create a milestone
	When a milestone for the dimension 'testDimension' is created
	Then the milestone should be stored
	And the milestone's dimension should be 'testDimension'
	And the milestone's threshold should be 123.4
	And the milestone's type should be 'gt'
	And the milestone should not be reached
