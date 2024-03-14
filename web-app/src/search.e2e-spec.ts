// import { browser, by, element, ElementFinder, ElementArrayFinder, Key ,ExpectedConditions} from 'protractor';

// describe('MyApp', () => {
//   beforeAll(() => {
//     browser.waitForAngularEnabled(false); // Disable waiting for Angular (if not an Angular application)
//   });

//   it('should perform a search and print results', async () => {
//     await browser.get('/');
//     const searchInput: ElementFinder = element(by.id('lst-ib')); // Adjust to match your search input element
//     await searchInput.sendKeys('your search query');
//     const searchButton: ElementFinder = element(by.id('searchButton')); // Adjust to match your search button element
//     await searchButton.click();

//     const linkLocator: string = 'cite._Rm'; // Adjust to match your search result links
//     const links: ElementArrayFinder = element.all(by.css(linkLocator));

//     await browser.wait(ExpectedConditions.elementToBeClickable(links.first()), 10);

//     const linkTextsPromise: Promise<string> = links.getText(); // Assuming this returns a Promise<string>
//     const linkTexts: Promise<string[]> = linkTextsPromise.then(text => [text]);
    
//     const resolvedLinkTexts: string[] = await linkTexts;
//     resolvedLinkTexts.forEach((linkText: string) => {
//       console.log(linkText);
//     });
//   });
// });