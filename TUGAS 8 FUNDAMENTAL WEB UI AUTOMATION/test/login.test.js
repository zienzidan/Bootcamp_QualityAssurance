const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

describe('SauceDemo - Login Test', function () {

    this.timeout(30000);

    let driver;

    before(async function () {
        let options = new chrome.Options();
        options.addArguments('--incognito');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });

    after(async function () {
        await driver.quit();
    });

    it('User berhasil login', async function () {

        await driver.get('https://www.saucedemo.com');

        // Assert Title
        const title = await driver.getTitle();
        assert.strictEqual(title, 'Swag Labs');

        // Input Login
        let username = await driver.findElement(By.css('[data-test="username"]'));
        let password = await driver.findElement(By.css('[data-test="password"]'));
        let loginBtn = await driver.findElement(By.id('login-button'));

        await username.sendKeys('standard_user');
        await password.sendKeys('secret_sauce');
        await loginBtn.click();

        // Wait sampai cart muncul
        let cartIcon = await driver.wait(
            until.elementLocated(By.css('[data-test="shopping-cart-link"]')),
            10000
        );

        await driver.wait(until.elementIsVisible(cartIcon), 5000);

        // Assert login sukses
        let appLogo = await driver.findElement(By.className('app_logo'));
        let logoText = await appLogo.getText();
        assert.strictEqual(logoText, 'Swag Labs');

        console.log("Login sukses");
    });

});
