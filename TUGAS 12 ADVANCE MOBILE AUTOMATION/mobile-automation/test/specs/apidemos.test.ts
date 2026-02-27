import { APIDemosActions } from "../actions/apidemos.action";

const apiDemosAction = new APIDemosActions();

describe("API Demos Homework - Alert Dialog", () => {

    afterEach(async function () {
        if (this.currentTest?.state === "failed") {
            try {
                await browser.saveScreenshot(`./screenshots/${this.currentTest?.title}.png`);
            } catch (err) {
                console.log("Session already closed");
            }
        }
    });

    it("Should input and verify name & password", async function () {

        const name = "Antonio";
        const password = "123456";

        await apiDemosAction.openTextEntryDialog();

        await apiDemosAction.fillName(name);
        await apiDemosAction.fillPassword(password);

        const actualName = await apiDemosAction.getNameValue();
        const actualPassword = await apiDemosAction.getPasswordValue();

        expect(actualName).toEqual(name);

        expect(actualPassword).toBeTruthy();
    });

});