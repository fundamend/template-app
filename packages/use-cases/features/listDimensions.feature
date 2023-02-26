Feature: List Dimensions

Scenario: List dimensions when several exist
	When existing dimensions are listed
	Then all existing dimensions should be found
