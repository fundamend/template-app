Feature: Subscribe Related Milestones

Scenario: Subscribing to existing related milestones
	When subscribed to existing related milestones
	Then existing related milestones should be returned
	And new related milestones should be returned
