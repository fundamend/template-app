Feature: Milestone

	A milestone is target measure that you are trying to reach

Scenario: Get details from a new milestone
	Given a milestone is created
	Then the milestone's id should be undefined
	And the milestone's dimension should be undefined
	And the milestone's threshold should be undefined
	And the milestone's type should be undefined
	And the milestone should not be reached

Scenario: Get details from a milestone that has details
	Given a milestone is created
	When the milestone's id is set to "test"
	And the milestone's dimension is set to "test"
	And the milestone's threshold is set to 1
	And the milestone's type is set to "gt"
	And the milestone is set to be reached
	Then the milestone's id should be "test"
	And the milestone's dimension should be "test"
	And the milestone's threshold should be 1
	And the milestone's type should be "gt"
	And the milestone should be reached
