import { Before, After, setDefaultTimeout, Status } from "@cucumber/cucumber";
import { Browser, Page, chromium, devices, BrowserContextOptions, firefox, webkit } from "@playwright/test";
import * as dotenv from 'dotenv';
import { Given } from "@cucumber/cucumber";

let page: Page;
let browser: Browser;
let selectedDevice: string;
let selectedEnvironment: string;
let brandUsed: string;
let brandUrl: string;

setDefaultTimeout(10000);

async function launchBrowser(brandUsed: string, deviceConfig: BrowserContextOptions, environment: string) {
	const currentBrowserUsed = process.env.ENV_VAR_DEVICE?.toString().toLocaleLowerCase();

	switch(currentBrowserUsed) {
		case 'chrome':
			browser = await chromium.launch({ headless: false });
			break;
		case 'firefox':
			browser = await firefox.launch({ headless: false });
			break;
		case 'webkit':
			browser = await webkit.launch({ headless: false });
			break;
		default:
			browser = await chromium.launch({ headless: false });
			break;
	}
    
	dotenv.config();
    const context = await browser.newContext(deviceConfig);
    page = await context.newPage();

    switch(brandUsed) {
		case 'EPICBET':
			brandUrl = process.env.EPICBET as string;
			break;
	}

	if (!brandUrl) {
		throw new Error('Brand url variable is not set');
	}

	console.log("Brand name " + brandUsed);
	console.log("Brand URL " + brandUrl);
	
    await page.goto(brandUrl);
    return page;
}

Before(async function (Scenario) {
	selectedDevice = process.env.ENV_VAR_DEVICE || 'default_device';
    selectedEnvironment = process.env.ENV_VAR_ENV || 'default_environment';
});

Given(/^I go to ([^"]*) brand$/, async function (brand: string) {
	brandUsed = brand;
	await launchBrowser(brandUsed, getDevice(selectedDevice), selectedEnvironment);
});

class SkipScenarioError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'SkipScenarioError';
    }
}

After(async function (Scenario) {
  try {
    if (Scenario.result!.status === Status.FAILED) {
      const currentUrl = page.url();
      const urlMessage = `Current URL: ${currentUrl}`;
      this.attach(urlMessage, "text/plain");
      this.attach( await page.screenshot({
          path: `./screenshots/${Scenario.pickle.name}.png`,
          fullPage: true,
        }),
        "image/png"
      );
    }

    await browser.close();
  } catch (error) {
    if (error instanceof SkipScenarioError) {
      console.log("Scenario skipped:", error.message);
      return;
    }
    throw error;
  }
});

function getDevice(device: string = 'default_device'): BrowserContextOptions {
	if (device === 'Chrome') {
	   return { viewport: { width: 1920, height: 1080 } };
	} else {
	   return devices[device];
	}
 }

export {page, browser, selectedEnvironment, brandUsed};