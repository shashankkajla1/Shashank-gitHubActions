const { test, expect } = require('@playwright/test');
const { HerokuAppLocator } = require('../locators/HerokuAppLocator');

// ** url ** //
const url_internet = "https://the-internet.herokuapp.com/?utm_source=chatgpt.com";
const alertTextValue = "You successfully clicked an alert";
const clickedCancel = "You clicked: Ok";
const promptText = "You entered: ";
//const password = "Learning@830$3mK2"

test.only('Alert Handling - Ok, Ok And Cancel, Prompt', async ({browser})=>{

const context = await browser.newContext();
const page = await context.newPage();
await page.goto(url_internet);
// await page.locator().textContent

// * Alert Handling Dialogs * //
const herokuLocators = new HerokuAppLocator(page);
await herokuLocators.javaScriptAlert.waitFor({state : "visible"});
await herokuLocators.javaScriptAlert.click();
await herokuLocators.clickJSButtonOk.click();
await page.waitForTimeout(2000);

// Ok
page.on('dialog', async dialog =>{
    console.log('Alert Message:', dialog.message()); // ** Not printing
    try{
        await dialog.accept();
        }
        catch(error){   
        }
});
await herokuLocators.confirmAlertText.waitFor({state: "visible"});
const text = await herokuLocators.confirmAlertText.textContent();
expect(text).toBe(alertTextValue);

// ** Cancel & accept ** //
await herokuLocators.clickJSButtonCancel.waitFor({state : "visible"});
await herokuLocators.clickJSButtonCancel.click();

page.on('dialog', async dialog=>{
    console.log('Dialog Type:', dialog.type());
     page.waitForTimeout(2000);
     try{
        await dialog.accept();
        }
        catch(error){   
        }
})
await herokuLocators.confirmAlertText.waitFor({state: "hidden"});
await herokuLocators.cancelAlertText.waitFor({state: "visible"});
const cancelText = await herokuLocators.cancelAlertText.textContent();
expect(cancelText).toBe(clickedCancel);

// ** Write something in input box of JS Alert & handle it. - Prompt handling
await herokuLocators.clickJSPrompt.waitFor({state : "visible"});
await herokuLocators.clickJSPrompt.click();

page.on('dialog', async dialog =>{
    console.log(dialog.type());
    try{
    await dialog.accept();
    }
    catch(error){
        
    }
})
await page.waitForTimeout(2000);
//await herokuLocators.youEnter.waitFor({state : "visible"});
const contentIs = await herokuLocators.youEnter.textContent();
expect(contentIs).toBe(promptText);
});

test(' Frames Handling & Nested Frames ', async({page})=>{
  await page.goto(url_internet);
  const herokuFrames = new HerokuAppLocator(page);

  await herokuFrames.framesSelect.waitFor({state:"attached"});
  await herokuFrames.framesSelect.click();
  await page.waitForTimeout(2000);

  // ** iframe handling ** //
  await herokuFrames.sel_iframe.waitFor({state:"visible"});
  await herokuFrames.sel_iframe.click();

  const checkFlag = await herokuFrames.contentText_iFrame.isVisible();
  if(!!checkFlag){
    console.log("Element is visible in iFrame" + checkFlag);
  }
  if(!checkFlag){
    console.log("Element is not visible in iFrame" + " "+checkFlag);
    await page.waitForTimeout(3000);
    const frame = page.frameLocator('.tox-edit-area__iframe') // frame class locator
    const checkVisibleFlag = await frame.locator("//p[text()='Your content goes here.']").isVisible(); // inside frame

    if(checkVisibleFlag){
        console.log("Element is visible in iFrame" + checkVisibleFlag);
        const content = await page.locator(".tox-notification__body").textContent(); // not in frame in parent page
        console.log(JSON.stringify(content));
        await page.locator("div[class='tox-icon']").click();
        const checkContent = await page.locator(".tox-notification__body").isHidden();
        console.log(`Check content ${checkContent}`);
        expect(!checkContent).toBeFalsy();
    }
    else{
        throw new Error("Element is not visible in iFrame" + " "+checkVisibleFlag);
    }

  }
  // ** Nested Frames **  goBack(), goForward(), reload() //
  await page.goBack();
  await herokuFrames.sel_iframeNested.waitFor({state:"visible"});
  await herokuFrames.sel_iframeNested.click();

  // ** Left frame ** //
  await switchFrame({ page }, "frame-left", "LEFT");
  await switchFrame({ page }, "frame-middle", "MIDDLE");
  await switchFrame({ page }, "frame-right", "RIGHT");

})

const switchFrame = async ({ page }, frameName, expectedText) => {
    await page.waitForTimeout(2000);
    const frame = page.frameLocator("frame[name='frame-top']").frameLocator(`frame[name='${frameName}']`);
  
    const content = await frame.locator("//*[normalize-space(text())='"+expectedText+"']").textContent();
    expect(String(content.trim())).toBe(expectedText);
    console.log('Content -> '+ " "+ String(content.trim()));
  
  };

/*
1. Start listening for new page event
2. Click button
3. Browser opens new tab
4. Event captured
5. New tab stored in newPage
-------------------------------------------------
Q1: Difference between Context and Page?
Answer : 
Context = browser session
Page = browser tab/window

Q2: Why Promise.all used?
Answer
To avoid missing page event before click execution.

Q3: How to switch windows in Playwright?
Answer
Playwright automatically gives page reference via:
waitForEvent('page')
context.pages()
*/
test(' Window Handling ', async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(url_internet);
    const windowHandling = new HerokuAppLocator(page);
    
    await windowHandling.windowSelect.waitFor({state : "visible"})
    await windowHandling.windowSelect.click();

    await windowHandling.windowClickLink.waitFor({state : "visible"});
    
    const [childPage] = await Promise.all([context.waitForEvent('page'), windowHandling.windowClickLink.click()])
    await childPage.waitForTimeout(2000);
    const content = await childPage.locator("h3").textContent();
    expect(content).toBe("New Window");
    await childPage.close();
    const contentParent = await page.locator("h3").textContent();
    expect(contentParent).toBe("Opening a new window");

});

test(' Mouse Over ', async({page})=>{
    
    await page.goto(url_internet);

    const hovers = new HerokuAppLocator(page);
    await hovers.hovers.waitFor({state : "visible"});
    await hovers.hovers.click();

    await hovers.userAvatar.first().waitFor({state : "visible"});

    await hovers.userAvatar.nth(1).hover();
    await page.waitForTimeout(1000);
    const cont= await hovers.hoverTag.nth(1).textContent();
    expect(cont).toBe("name: user2");

})

test(' File Uploading & Downloading ', async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    // ** File Uploading ** //
    await page.goto(url_internet);
    const fileUpload = new HerokuAppLocator(page);

    await fileUpload.fileUpload.waitFor({state : "visible"});
    await fileUpload.fileUpload.click();

    await fileUpload.choosefile.waitFor({state : "visible"});
    await fileUpload.choosefile.setInputFiles("/Users/shashankkajla/Downloads/Test.png");
    await page.waitForTimeout(2000);
    await page.locator("#file-submit").click();
    await page.locator("h3").waitFor({state : "visible"});
    const content = await page.locator("h3").textContent();
    expect(content).toBe("File Uploaded!");

    // ** File Downloading ** //
    await page.goto("https://the-internet.herokuapp.com/?utm_source=chatgpt.com");
    await page.waitForTimeout(3000);

    await fileUpload.fileDownload.waitFor({state : "visible"});
    await fileUpload.fileDownload.click();
    await page.waitForTimeout(3000);

    const [download] = await Promise.all([context.waitForEvent('download'), page.locator("[href*='/inputdata.json']").click()])
    const file = download.suggestedFilename();
    await download.saveAs(`/Users/shashankkajla/Documents/PlaywrightJS_RS/FileDownload/${file}`);

    const fs = require('fs');
    const filePath =`/Users/shashankkajla/Documents/PlaywrightJS_RS/FileDownload/${file}`;

    const checkFile = fs.existsSync(filePath);
    console.log(checkFile);
    expect(checkFile).toBeTruthy();
})


test('Basic Authentication Handling', async ({ browser }) => {
    
      // Create browser context with credentials, to load credentials in browser session and then pass that context to page, 
     //so that when page will load it will automatically pass credentials and login to application.
      
     const context = await browser.newContext({
    
        httpCredentials: {
          username: 'admin',
          password: 'admin'
        }
      });
      // Open new page
      const page = await context.newPage();
      
      // Navigate to authenticated URL
      await page.goto('https://the-internet.herokuapp.com/basic_auth');
    
      // Validate successful login message
      const successMessage = page.locator('p');
    
      await expect(successMessage).toContainText('Congratulations! You must have the proper credentials.');
      console.log('Basic Authentication Successful');    
});

test(' Drag & Drop ', async ({page}) => {   
  
    await page.goto(`https://the-internet.herokuapp.com/drag_and_drop`);
    await page.waitForTimeout(2000);
    
    const source = page.locator("#column-a");
    const target = page.locator("#column-b");
    await source.dragTo(target);

    await page.waitForTimeout(3000);
    const sourceText = await source.locator("header").textContent();
    const targetText = await target.locator("header").textContent();
    expect(sourceText).toBe("B");
    expect(targetText).toBe("A");
})

test('Scrolling Handling', async ({page}) => {
 
})

test('Google Search - Shashank', async ({browser}) => {
    
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Navigate to Google
    await page.goto('https://www.google.com/');
    await page.waitForTimeout(2000);
    console.log('Navigated to Google');
    
    // Google Search Box Locator
    const googleSearchBox = page.locator('textarea[name="q"]');
    await googleSearchBox.waitFor({ state: 'visible' });
    console.log('Search box locator found: textarea[name="q"]');
    
    // Type "Shashank" in search box
    await googleSearchBox.fill('Shashank');
    console.log('Typed "Shashank" in search box');
    
    // Wait 6 seconds to see the browser
    await page.waitForTimeout(6000);
    
    // Verify text was entered
    const searchText = await googleSearchBox.inputValue();
    expect(searchText).toBe('Shashank');
    console.log('Search text verified:', searchText);
    
    await context.close();
})