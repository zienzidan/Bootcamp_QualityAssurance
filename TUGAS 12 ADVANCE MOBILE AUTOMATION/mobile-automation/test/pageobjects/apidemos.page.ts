export class APIDemosPage {

    static appBtn() {
        return $('~App');
    }

    static alertDialogsBtn() {
        return $('~Alert Dialogs');
    }

    static textEntryDialogBtn() {
        return $('~Text Entry dialog');
    }

    static nameField() {
        return $('id:io.appium.android.apis:id/username_edit');
    }

    static passwordField() {
        return $('id:io.appium.android.apis:id/password_edit');
    }
}