Feature: Test

Scenario: Test
	Given I check if the worker is running
	Then it is running

Scenario: Another test
	Given I call the worker
	Then it returns an error
