const { Builder } = require('selenium-webdriver');
const LoginAction = require('../actions/login.actions');
const { compareScreenshot } = require('../../utilities/visual_regression.helper')

describe('Login', () => {
    let driver;
    let loginAction;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        loginAction = new LoginAction(driver);
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

        await compareScreenshot(driver, 'success_login');
    });

    it('should login with invalid credentials', async () => {
        await loginAction.inputUsername('user_ngasal');
        await loginAction.inputPassword('password_ngasal');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed(
            'Epic sadface: Username and password do not match any user in this service'
        );

        await compareScreenshot(driver, 'login_invalid_credential');
    });

    it('should login with empty password', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed(
            'Epic sadface: Password is required'
        );

        await compareScreenshot(driver, 'login_empty_password');
    });

    it('should login with invalid username', async () => {
        await loginAction.inputUsername('gokil');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();

        await loginAction.assertLoginFailed(
            'Epic sadface: Username and password do not match any user in this service'
        );

        await compareScreenshot(driver, 'login_invalid_username');
    });

    it('should login with wrong password', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('wrong_password');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed(
            'Epic sadface: Username and password do not match any user in this service'
        );

        await compareScreenshot(driver, 'login_wrong_password');
    });

    it('should login with locked out user', async () => {
        await loginAction.inputUsername('locked_out_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed(
            'Epic sadface: Sorry, this user has been locked out.'
        );

        await compareScreenshot(driver, 'login_locked_user');
    });
});