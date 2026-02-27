export class APIDemosActions {

    // ===== SELECTORS =====
    private get appMenu() {
        return $('~App')
    }

    private get alertDialogsMenu() {
        return $('~Alert Dialogs')
    }

    private get textEntryButton() {
        return $('id=io.appium.android.apis:id/text_entry_button')
    }

    private get usernameField() {
        return $('id=io.appium.android.apis:id/username_edit')
    }

    private get passwordField() {
        return $('id=io.appium.android.apis:id/password_edit')
    }

    // ===== NAVIGATION =====
    async openTextEntryDialog() {
        await this.appMenu.waitForDisplayed({ timeout: 20000 })
        await this.appMenu.click()

        await this.alertDialogsMenu.waitForDisplayed({ timeout: 20000 })
        await this.alertDialogsMenu.click()

        await this.textEntryButton.waitForDisplayed({ timeout: 20000 })
        await this.textEntryButton.click()
    }

    // ===== ACTIONS =====
    async fillName(name: string) {
        await this.usernameField.waitForDisplayed({ timeout: 10000 })
        await this.usernameField.clearValue()
        await this.usernameField.setValue(name)
    }

    async fillPassword(password: string) {
        await this.passwordField.waitForDisplayed({ timeout: 10000 })
        await this.passwordField.clearValue()
        await this.passwordField.setValue(password)
    }

    async getNameValue() {
        return await this.usernameField.getAttribute("text")
    }

    async getPasswordValue() {
        return await this.passwordField.getAttribute("text")
    }
}