Feature: Subscribe Dimensions

Scenario: Subscribing to existing dimensions
	When subscribed to existing dimensions
	Then existing dimensions should be returned
	And new dimensions should be returned
