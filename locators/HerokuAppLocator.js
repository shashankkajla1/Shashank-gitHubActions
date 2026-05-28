class HerokuAppLocator{

     constructor(page){
        this.page = page;

        // ** Alert Handling Locators ** //
        this.javaScriptAlert = page.locator("//*[text()='JavaScript Alerts']");
        this.clickJSButtonOk = page.locator("//*[text()='Click for JS Alert']");
        this.confirmAlertText = page.locator("//p[text()='You successfully clicked an alert']")
        this.clickJSButtonCancel = page.locator("//*[text()='Click for JS Confirm']");
        this.cancelAlertText = page.locator("//p[text()='You clicked: Ok']")
        this.clickJSPrompt = page.locator("//*[text()='Click for JS Prompt']")
        this.youEnter = page.locator("//p[text()='You entered: ']")
        
        // ** Frames Handling Locators ** //
        this.framesSelect = page.locator("//*[text()='Frames']");
        this.sel_iframe = page.locator("//*[text()='iFrame']");
        this.contentText_iFrame = page.locator("//p[text()='Your content goes here.']")
        this.sel_iframeNested = page.locator("//*[text()='Nested Frames']");

        // ** Window Handling ** //
        this.windowSelect = page.locator("//*[text()='Multiple Windows']");
        this.windowClickLink = page.locator("//*[text()='Click Here']");

        // ** Mouse Over ** //
         this.hovers = page.locator("//*[text()='Hovers']");
         this.userAvatar = page.locator("[alt='User Avatar']")
         this.hoverTag = page.locator("h5");

        // ** File Uploading & File Downloading ** //
        this.fileUpload = page.locator("//*[text()='File Upload']");
        this.choosefile = page.locator("#file-upload");

        this.fileDownload = page.locator("//*[text()='File Download']");

     }

}

module.exports = { HerokuAppLocator };