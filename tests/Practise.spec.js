const {test, expect } = require('@playwright/test');

test('SET -1 Using Wait To load', async({browser})=>{ 
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto('https://rahulshettyacademy.com/client/dashboard/dash');
   
   //Login Steps valid:
   const userName = page.locator("#userEmail");
   const password = page.locator("#userPassword");
   const signIn = page.locator("input[type='submit']");
   
   //elements
   const elements = page.locator("[class='card-body'] h5");
   await userName.fill("shashankkajla1@gmail.com");
   await password.fill("Test1234");
   await signIn.click();
   
   let elementsAll = [];
   const elementsArray = await elements.allTextContents();
   if(elementsArray.length === 0){
    await page.waitForLoadState('load');
    elementsAll = await elements.allTextContents();
    console.log(elementsAll);
   }
   const value = elementsAll.filter((ele)=>{
    if(ele === 'ADIDAS ORIGINAL'){      
      return ele;
    }
   })
   if(!!value){
    value.toString();
    console.log(`Filtered Value is : ${value}`);
   }
   await page.locator("button").nth(3).click();
   await page.waitForTimeout(3000);

});

test('SC-2 : Unique getBy Locators', async({page})=>{
  await page.goto("https://rahulshettyacademy.com/angularpractice/")
  //getByLabel : It will search web page which have label tag and reach their which
  // have aasociated text their.
  // now when you say click, where the clickable option is available related to the text it will click.
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check(); // click radio btn for emp, here no need to give css, xpath
    // you can use click of check() also
    await page.getByLabel("Gender").selectOption("Female")

    //getByPlaceholder : it will search for input fields which have placeholder attribute
    await page.getByPlaceholder("Password").fill("Test1234")
    //getByRole:
    await page.getByRole('button', { name: 'Submit' }).click();
});

test('SC-3 : Handling iteration list in single line using filter() and getByRole()', async({page})=>{

    await page.goto('https://rahulshettyacademy.com/client/dashboard/dash');
    
    //Login Steps valid:
    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const signIn = page.locator("input[type='submit']");
    
    //elements
    const elements = page.locator("[class='card-body']");

    await userName.fill("shashankkajla1@gmail.com");
    await password.fill("Test1234");
    await signIn.click();
    await page.waitForLoadState('networkidle');
    
    // Handling list with filter in single line of code.
    await elements.filter({hasText: 'ADIDAS ORIGINAL'}).getByRole('button', { name: 'x' }).click();   
})

test('SC-4 : Alert PopUps & Hidden eements ', async({page})=>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.goto('https:google.com');
    await page.goBack(); // navigates to web page | goForward()

    // * Visiblity
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible();
    await page.locator("//input[@value='Hide']").click();
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden();

    // * Alert Pop-PopUps, in playwright we call it as a dilaoge
    // It here on will listen to an event when it will emit and perform action
    await page.locator('#confirmbtn').click();
    await page.waitForTimeout(2000);
    page.on('dialog', dialog=>{
    console.log(dialog.message());
    dialog.accept(); // to click ok
    //dialog.dismiss(); // to click cancel
    })
    // ** hover() or can say mouse over action
    await page.locator('#mousehover').hover();
    await page.waitForTimeout(2000);
    await page.locator("text=Top").click();

    // *** Handling frames::
    //.. here it will switch to it and return new page obj.
    const obj = page.frameLocator("#courses-iframe")
    await obj.locator("//div[@class='login-btn']").nth(1).click();
    await page.waitForTimeout(2000);
    await page.screenshot({path : 'frame.png'});
})