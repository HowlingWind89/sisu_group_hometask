import { test, expect } from '@playwright/test';
import { MainLobbyPage } from '../page-objects/main-lobby-page';
import { GameSearchModal } from '../page-objects/game-search-modal';
import { Given, When, Then } from '@cucumber/cucumber';
import { page } from '../step-definitions/hooks.steps';

let mainLobbyPage = new MainLobbyPage()
let gameSearchModal = new GameSearchModal()

When("I check that casino lobby is selected", async () => {
	await page.locator(mainLobbyPage.lobbieTabButton).getAttribute("selected");
});

When("I click on search button ", async () => {
	await page.locator(mainLobbyPage.searchButton).click();
});

When("I check that search modal is opened", async () => {
    page.locator(gameSearchModal.searchDialogue).isVisible;
});