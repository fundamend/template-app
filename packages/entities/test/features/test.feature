Feature: Test

Scenario Outline: Initializing a Test with leading or trailing spaces
	Given a Test is initialized with nothing
	Then its name is "undefined"

Scenario Outline: Initializing a Test
	Given a Test is initialized with "<input>"
	Then its name is "<output>"

	Examples:
	| input | output    |
	|       | undefined |
	| name  | name      |

Scenario Outline: Initializing a Test with leading or trailing spaces
	Given a Test is initialized with "  name  "
	Then its name is "name"
