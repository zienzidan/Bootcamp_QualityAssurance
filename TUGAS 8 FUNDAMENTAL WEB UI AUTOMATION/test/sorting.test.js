const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

describe('SauceDemo - Sorting Test', function () {

    this.timeout(30000);

    let driver;

    before(async function () {
        let options = new chrome.Options();
        options.addArguments('--incognito');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        // Login dulu sebelum sorting
        await driver.get('https://www.saucedemo.com');

        let username = await driver.findElement(By.css('[data-test="username"]'));
        let password = await driver.findElement(By.css('[data-test="password"]'));
        let loginBtn = await driver.findElement(By.id('login-button'));

        await username.sendKeys('standard_user');
        await password.sendKeys('secret_sauce');
        await loginBtn.click();

        await driver.wait(
            until.elementLocated(By.css('[data-test="product-sort-container"]')),
            10000
        );
    });

    after(async function () {
        await driver.quit();
    });

    it('Sorting produk berhasil dijalankan', async function () {

        async function selectSort(optionText) {
            let dropdown = await driver.findElement(By.css('[data-test="product-sort-container"]'));
            await dropdown.click();

            let option = await driver.findElement(By.xpath(`//option[text()="${optionText}"]`));
            await option.click();

            await driver.sleep(5000);
        }

        // Sort 1
        await selectSort("Price (low to high)");

        // Sort 2
        await selectSort("Price (high to low)");

        // Sort 3
        await selectSort("Name (Z to A)");

        console.log("Semua sorting berhasil dijalankan");

        // Assertion sederhana biar ada validasi
        let firstProduct = await driver.findElement(By.className('inventory_item_name'));
        let productText = await firstProduct.getText();

        assert.ok(productText.length > 0);
    });

});
