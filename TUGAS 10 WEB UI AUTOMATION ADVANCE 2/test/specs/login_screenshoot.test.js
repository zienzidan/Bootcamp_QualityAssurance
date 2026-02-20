const { Builder } = require('selenium-webdriver');
const LoginAction = require('../actions/login.actions');
const SharingAction = require('../actions/sharing.actions');
const LoginPage = require('../pageobjects/login.page');

describe('Login', () => {
    let driver;
    let loginAction;
    let sharingAction;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        loginAction = new LoginAction(driver);
        sharingAction = new SharingAction(driver);

        await loginAction.openLoginPage('https://www.saucedemo.com/');
    });

    afterEach(async () => {
        await driver.quit();
    });

    it('should login with valid credentials', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginSuccess();

        await sharingAction.fullPageScreenshot('login_success');
    });

    it('should login with invalid credentials', async () => {
        await loginAction.inputUsername('user_ngasal');
        await loginAction.inputPassword('password_ngasal');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed(
            'Epic sadface: Username and password do not match any user in this service'
        );
        await sharingAction.fullPageScreenshot('login_invalid_credential');
    });

    it('should login with empty password', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed(
            'Epic sadface: Password is required'
        );
        await sharingAction.fullPageScreenshot('login_empty_password');
        await sharingAction.partialScreenshot(LoginPage.errorMessage,'login_empty_password_partial'
        );
    });

    it('should login with invalid username', async () => {
        await loginAction.inputUsername('gokil');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();

        await loginAction.assertLoginFailed(
            'Epic sadface: Username and password do not match any user in this service'
        );

        await sharingAction.fullPageScreenshot('login_invalid_username');
    });

    it('should login with wrong password', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('wrong_password');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed(
            'Epic sadface: Username and password do not match any user in this service'
        );

        await sharingAction.fullPageScreenshot('login_wrong_password');
    });

    it('should login with locked out user', async () => {
        await loginAction.inputUsername('locked_out_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed(
            'Epic sadface: Sorry, this user has been locked out.'
        );

        await sharingAction.fullPageScreenshot('login_locked_user');
    });
});