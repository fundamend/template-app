Feature: Subscribe Related Measures

Scenario: Subscribing to existing related measures
	When subscribed to existing related measures
	Then existing related measures should be returned
	And new related measures should be returned
