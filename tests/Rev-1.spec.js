const {test, expect}= require('@playwright/test');

test('1. Validate Title and logged in successfully to application', async ({page})=>{

    // async ({browser})
    //const context= await browser.newContext();
    //const page=  await context.newPage();
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // Title validation: 
    const title = "LoginPage Practise | Rahul Shetty Academy";
    if(typeof title=== 'string') console.log("Title is STR");
    await expect(page).toHaveTitle(title)

    //Login Steps Invalid: 
    await page.locator('input#username').fill("rahulshetty");
    await page.locator('input#password').fill("learning");
    await page.locator('#signInBtn').click();
    const textIs= await page.locator("[class*='alert alert-danger']").textContent();

    await expect(page.locator("[class*='alert alert-danger']")).toHaveText(textIs);

    //Login Steps valid:
    const userName =  page.locator("input[id='username']");
    const pass =  page.locator("input[id='password']");
    const signIn = page.locator("input[name='signin']");

    await userName.fill("rahulshettyacademy");
    await pass.fill("learning")
    await signIn.click();

    await expect(page).toHaveTitle("ProtoCommerce");
    //await page.pause();

})

test('Test -2 Grab All text from Product', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    //Login Steps valid:
    const userName =  page.locator("input[id='username']");
    const pass =  page.locator("input[id='password']");
    const signIn = page.locator("input[name='signin']");

    await userName.fill("rahulshettyacademy")
    await pass.fill("learning")
    await signIn.click();

    // ** Grab Product Title **
    const cardItemsList = page.locator('.card-body a')
    // - ** First Element of List & Last Element of the List**
    const eleFirst= await cardItemsList.first().textContent()
    const eleLast = await cardItemsList.last().textContent() 
    console.log(`First Element is : ${eleFirst} & Last Element is : ${eleLast}`)
    
    // - ** In Between Last Element ** 
    const inBetween= await cardItemsList.nth(2).textContent(); // return text
    console.log(`In Between is : ${inBetween}`);

    // - ** Grab Text From All **
    await page.waitForLoadState('networkidle') // wait until all n/w calls connection done 
    await cardItemsList.last().waitFor() // meaning till last ele gets loaded

    const grab= await cardItemsList.allTextContents(); // return an Array
    console.log(`All content ${grab}`);

    await expect(grab).toHaveLength(4) // await not required here 
    
    // ** Wait Mechanism ** 
   // await page.waitForLoadState('networkidle') // ** untill n/w services loaded.
  //await grabtextAll.last().waitFor(); // Dynamic wait to load ele if above function seems flaky check playwright docs for above funcn.

  // Here , grabtextAll.waitFor(); have more than 1 locator match,
 // waitFor(); locator only works for a single locator, So it do not know which to wait for.

})

test('Test - 3 Handling Ui Actions', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    
    // ** Radio Btn's Content **
    const radioBtn = page.locator("span[class='checkmark']")
    const radioTextsBtn = page.locator("label.customradio")
    const cancelBtnPopUp = page.locator("#cancelBtn")


    // ** Radio Btn ** 
    const allTxt = await radioTextsBtn.allTextContents();
    expect(allTxt).toHaveLength(2);
    
    console.log(await radioBtn.count());
    await radioBtn.nth(1).click();
    await cancelBtnPopUp.click();

    // -- ** Using loop ** -- 
    for(let i=0; i<radioBtn.count; i++){
      const match = await radioTextsBtn.nth(i+1).textContent();

        if(match.includes('User')){
        await radioBtn.nth(i+1).click();
        await cancelBtnPopUp.click();
        }
    }

    // ** Handling DropDown ** 
    const select_dropDown = page.locator("select.form-control");
    const select_dropDownOptn = page.locator("select.form-control option");

    await select_dropDown.selectText("Teacher")
    await select_dropDown.selectOption("stud") // <sel option="stud"> : select value of option

    await page.waitForLoadState('networkidle')
    const txt = await select_dropDownOptn.allTextContents(); // it will give undefined unresolved promise if dont use await
    console.log(txt); // [ 'Student', 'Teacher', 'Consultant' ]
    console.log(txt.length); // 3

    // ** Check & Un-check CheckBox ** 
    const checkBoxText = page.locator("span.text-white")
    const click_checkBox = page.locator("#terms")
    const textIs = await checkBoxText.textContent();
    console.log(textIs);

    await click_checkBox.click();

    expect(await click_checkBox.isChecked()).toBeTruthy(); // toBeFalsy()

    // ** To check Text is Blinking or Not ** 
    await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class", 'blinkingText')
})

test('Test - 4 Child Window Handling', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    //Login Steps valid:
    const userName =  page.locator("input[id='username']");
    const pass =  page.locator("input[id='password']");
    const signIn = page.locator("input[name='signin']");

    await userName.fill("rahulshettyacademy")
    await pass.fill("learning")
    await signIn.click();

})

