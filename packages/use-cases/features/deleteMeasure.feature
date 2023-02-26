Feature: Delete Measure

Scenario: Delete an existing measure
	When an existing measure is deleted
	Then the measure should be removed from storage
