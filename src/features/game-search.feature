@Test
Feature: Game Search

	Scenario: Game Search with not existing games
    Given I go to EPICBET brand
    When I check that casino lobby is selected
    And I click on search button
    And I check that search modal is opened
	Then I check that search text is Games found: 0
	And I enter game name as qweqweqweqweqweqeq
	Then I check that search text is Games found: 0

    Scenario: Game Search with existing games
    Given I go to EPICBET brand
    When I check that casino lobby is selected
    And I click on search button
    And I check that search modal is opened
	Then I check that search text is Games found: 0
	And I enter game name as Wild Hot Chilli Reels
	Then I check that search text is Games found: 2