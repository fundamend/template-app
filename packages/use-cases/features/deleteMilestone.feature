Feature: Delete Milestone

Scenario: Delete an existing milestone
	When an existing milestone is deleted
	Then the milestone should be removed from storage
