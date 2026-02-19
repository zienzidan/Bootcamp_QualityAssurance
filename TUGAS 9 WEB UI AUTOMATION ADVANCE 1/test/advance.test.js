const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

describe('Advanced Automation', function () {

    this.timeout(120000);

    let driver;
    const browser = process.env.BROWSER || 'chrome';

    // BEFORE → Setup Browser
    before(async function () {

        if (browser === 'chrome') {
            let options = new chrome.Options();

            options.addArguments('--headless=new');
            options.addArguments('--incognito');
            options.addArguments('--window-size=1920,1080');

            driver = await new Builder()
                .forBrowser('chrome')
                .setChromeOptions(options)
                .build();
        } else {
            driver = await new Builder()
                .forBrowser(browser)
                .build();
        }
    });

    // BEFORE EACH → Login
    beforeEach(async function () {

        await driver.get('https://www.saucedemo.com');

        let username = await driver.findElement(By.css('[data-test="username"]'));
        let password = await driver.findElement(By.css('[data-test="password"]'));
        let loginBtn = await driver.findElement(By.id('login-button'));

        await username.sendKeys('standard_user');
        await password.sendKeys('secret_sauce');
        await loginBtn.click();

        await driver.wait(
            until.elementLocated(By.css('[data-test="shopping-cart-link"]')),
            10000
        );
    });

    // AFTER EACH → Screenshot
    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const fileName = `screenshot-${this.currentTest.title.replace(/\s+/g, '_')}-${Date.now()}.png`;
        fs.writeFileSync(fileName, screenshot, 'base64');
        console.log(`Screenshot saved: ${fileName}`);
    });

    // AFTER → Quit Browser
    after(async function () {
        await driver.quit();
    });

    // TEST CASE 1
    it('Verify Login Successful', async function () {
        let appLogo = await driver.findElement(By.className('app_logo'));
        let logoText = await appLogo.getText();
        assert.strictEqual(logoText, 'Swag Labs');
        console.log("Login verification passed ✅");
    });

    // TEST CASE 2
    it('Sort Price Low to High', async function () {
        await selectSort("Price (low to high)");
        console.log("Sorted Low to High");
    });

    // TEST CASE 3
    it('Sort Price High to Low', async function () {
        await selectSort("Price (high to low)");
        console.log("Sorted High to Low");
    });

    // TEST CASE 4
    it('Sort Name Z to A', async function () {
        await selectSort("Name (Z to A)");
        console.log("Sorted Name Z to A");
    });

    // SORT FUNCTION
    async function selectSort(optionText) {
        let dropdown = await driver.findElement(By.css('[data-test="product-sort-container"]'));
        await dropdown.click();

        let option = await driver.findElement(By.xpath(`//option[text()="${optionText}"]`));
        await option.click();

        await driver.sleep(1000);

        let firstProduct = await driver.findElement(By.className('inventory_item_name'));
        let productText = await firstProduct.getText();

        assert.ok(productText.length > 0);
    }

});
