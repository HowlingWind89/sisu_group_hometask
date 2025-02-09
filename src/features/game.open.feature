@Test
Feature: Game Open

    Scenario: Game Open
    Given I go to EPICBET brand
    When I check that casino lobby is selected
    And I click on search button
    And I check that search modal is opened
	Then I check that search text is Games found: 0
	And I enter game name as Wild Hot Chilli Reels
	Then I check that search text is Games found: 2
	And I click on game thumbnail
	Then Game is opened successfully