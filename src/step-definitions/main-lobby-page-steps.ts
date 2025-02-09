import { test, expect } from '@playwright/test';
import { MainLobbyPage } from '../page-objects/main-lobby-page';
import { GameSearchModal } from '../page-objects/game-search-modal';
import { Given, When, Then } from '@cucumber/cucumber';
import { page } from '../step-definitions/hooks.steps';
import { error } from 'console';

let mainLobbyPage = new MainLobbyPage()
let gameSearchModal = new GameSearchModal()

When("I check that casino lobby is selected", async () => {
	let isCasisnoLobbySelected: string = await page.locator(mainLobbyPage.lobbieTabButton).getAttribute("class");

	if (isCasisnoLobbySelected.includes("selected")) {
		console.log("User is on Casino lobby");
		} else {
			throw (error);
	}
});

When("I click on search button", async () => {
	await page.locator(mainLobbyPage.searchButton).click();
});

When("I check that search modal is opened", async () => {
    page.locator(gameSearchModal.searchDialogue).isVisible;
});

When(/^I enter game name as ([^"]*)$/, async (gameName: string) => {
    await page.locator(gameSearchModal.searchField).fill(gameName);
});

Then(/^I check that search text is ([^"]*)$/, async (gameSearchResultsNumber: string) => {
   const searchResultText = page.locator(gameSearchModal.searchResults);
   await expect(searchResultText).toHaveText(gameSearchResultsNumber);
});

When("I click on game thumbnail", async () => {
	await page.locator(gameSearchModal.gameLocator).click();
});