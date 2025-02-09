export class GameSearchModal {
    
    searchDialogue: string = "//div[@data-testid='search-container']";

    searchField: string = "//input[@data-testid='search-input']";

	searchResults: string = "//div[@class='_9l6sxx2' and contains(text(), 'Games found: ')]";

	gameLocator: string = "//a[@data-testkey='2800']";

}
