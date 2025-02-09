import { test, expect } from '@playwright/test';
import { GameScreen } from '../page-objects/game-screen';
import { Given, When, Then } from '@cucumber/cucumber';
import { page } from '../step-definitions/hooks.steps';

let gameScreen = new GameScreen()

Then("Game is opened successfully", async () => {
	await page.locator(gameScreen.gameControlButtons).isVisible();
});