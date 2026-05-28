const { test, expect } = require('@playwright/test');

test('Demo Test 1', async ({browser})=>{

    const context = await browser.newContext();
    const pageIs = await context.newPage();
    await pageIs.waitForTimeout(3000); 
    //await pageIs.goto("https://google.com/");
   // context.close();

});

test('Demo Test 2', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const match = await page.title();
    if(typeof match === 'string'){
        console.log("Passed Test!!");
    }
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

     // ** Filling Form input field | type [latest version deprecated type function], fill
    // ** fill() also clear the input and write text.
   // await page.locator("input[id='username']").type("rahulshetty");

    const userName =  page.locator("input[id='username']");
    const pass =  page.locator("input[id='password']")
    const signIn = page.locator("input[name='signin']")
    const grabtextAll = page.locator(".card-body a")

    await userName.fill("rahulshetty");
    await pass.fill("learning");
    await signIn.click();

    const text= await page.locator("div[class='alert alert-danger col-md-12']").textContent();

      if(text){
        expect(text).toContain('Incorrect')
        console.log("If Block Executes");
      }

    // ** valid creds **
    console.log("Valid creds written");
    await userName.fill("rahulshettyacademy");
    await pass.fill("learning");
    await signIn.click();

    // ** Grab The title of the first product on the page.
    const allProduct = await page.locator(".card-body a").first().textContent();
    console.log(allProduct); // return 1st ele in arr

    const allProduct1 = await page.locator(".card-body a").nth(1).textContent();
    console.log(allProduct1); // return 2nd ele in arr

    // ** Grab Text of all Products 
    console.log(" === All the titles === ");
    await page.waitForLoadState('networkidle') // ** untill n/w services loaded.
    await grabtextAll.last().waitFor(); // Dynamic wait to load ele if above function seems flaky check playwright docs for above funcn.
    const allTheTitles= await grabtextAll.allTextContents(); // not have wait check docs playwright
    // ** Here, in playwright allTextContents() return array but dont wait till ele present
    // as check the documentation it will return empty array or list array.

    expect(allTheTitles).toHaveLength(4);
    
    console.log(allTheTitles); // [ 'iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry' ]

    // ** Wait Mechanism ** 
   await page.waitForLoadState('') // ** untill n/w services loaded.
  //await grabtextAll.last().waitFor(); // Dynamic wait to load ele if above function seems flaky check playwright docs for above funcn.
});

// https://rahulshettyacademy.com/client/dashboard/dash | shashankkajla1@gmail.com | Test1234

/* NOTE ::  Service base architecture
- Open n/w Tab select Fetch/XXHR here the api calls are available where the data is rendering 
in Front end from backed.

- So frontend guy just read the json response and load the data to frontend.

- In playwright we have function so that it will wait until all service call is available in dom 
than it willperform action on UI

- If we can wait until all calls are made than data will be shown on UI from services data is coming.
*/

/*

Here , grabtextAll.waitFor(); have more than 1 locator match,
waitFor(); locator only works for a single locator, So it do not know which to wait for.
*/

// ** Handling Dropdown :: UI Controls

test('Demo 3', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.waitForLoadState('domcontentloaded')

    const userName =  page.locator("input[id='username']");
    const pass =  page.locator("input[id='password']")
    const clickVal = page.locator("[value='user']")
    const radioBtn = page.locator(".customradio .radiotextsty")
    const selectDropDown = page.locator("select[class='form-control']")
    const clickPopuP = page.locator("#okayBtn")
    const termsCheckBox = page.locator('#terms')
    const signIn = page.locator("input[name='signin']")
    
    await userName.fill("rahulshettyacademy")
    await pass.fill("learning");
    await page.waitForTimeout(4);
   
    const countIs = await radioBtn.count();
    console.log(countIs);

    for(let i=0; i< countIs; i++){
        const text = await radioBtn.nth(i+1).textContent(); // User
        if(text.trim() === 'User'){
            await clickVal.click();
            console.log("User Clicked!");
            // Putting assertion once its check to validate wheather its checked or not!
            await expect(radioBtn.nth(i+1)).toBeChecked();
           // await radioBtn.nth(i+1).isChecked(); // return boolean T or F
            break;
            // Alwz add assertion
        }
    }
    // Popup normal one 
    await clickPopuP.click();

    // ** Dropdown ** | await selectDropDown.selectText("Teacher");
    await selectDropDown.selectOption("teach");

    // ** Check()- UnChecked() : We dont have assertion to unchecked so to handle it isChecked() use
    await termsCheckBox.click();
    await termsCheckBox.uncheck();
   
    expect(await termsCheckBox.isChecked()).toBeFalsy();
    //await page.pause(); // To pause the script in new window, called play wright inspector

    // To check its blinking or not :: in html hvae blinking ::
    await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class", "blinkingText");

});

/*
- Whenever perform action on Ui need to write await here perform actn outside
await expect(radioBtn.nth(i+1)).toBeChecked();
expect(await termsCheckBox.isChecked()).toBeFalsy(); , here perform inside
*/

// ** handling Child Window Using Playwright **

test('Demo Test 4 ', async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
             

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.waitForLoadState('domcontentloaded')

    const documentLink = page.locator("[href*='documents-request']")

    // A set of steps that you want it will parallely go those step you can wrap in 1 array.
    const [newPage] = await Promise.all([context.waitForEvent('page'), documentLink.click()]);
    // page to get trigger or opened in background, // promise, pending, reject, fullfill
    /* I will come out from this array block untill all steps are fullfilled, if it is pending it won't 
    come out from the steps it will keep on iterating these two steps.
    It will wait untill both steps promise fullfilled if any of step promise rejected than script will fail.

    click step is not returning anything

    when there is two class there is space

    we dont know on clcikng how many window it will open so thats why we use [newPae] array

    normal page focus only on parent window
    */
    const text= await newPage.locator(".red").textContent();
    console.log(text);
    let arr= text.split('@')
    // Scan entire str where it found @ it split in two part and return array.
    // splitted left and right part will store in an array
    /*
   [
     'Please email us at mentor',
      'rahulshettyacademy.com with below template to receive response ' 
   ]
    */
    console.log(arr[1]);

    const domain = arr[1].split(' ')[0]
    console.log(domain);

// ** Now i want to Fetch the email id from this text and go to parent window and enter the email id their.
     const un = page.locator('#username'); // switch back to previous page, parent page
     await un.type(domain);
     console.log(await page.locator('#username').textContent());

     await page.pause();

})

// - more than 1 step dependency in playwright that will go asynchronisoly to execute parally.
// - use promise.all(), control make sure those two fullfilled before proceed to furthur steps.

/*

Problem :
    const documentLink = page.locator("[href*='documents-request']")

    documentLink.click();
    context.waitForEvent('page')

 - The duity for this waitforEvent here to listen if any new page is open so the moment you click on
   above link now after this step executed you reach here, in context you started listening to new page
   but the new document page is just opened now there is no point to listen now after page is
   opened so this method should be in listening state before you perform any operation of opening page 
   so that it will catch the event and give you new page but if you write that event after that event it will 
   again search the new event to happen it cannot go back so thats the reason we write it before click(); 

 -  context.waitForEvent('page')
    documentLink.click();

    you know every method in JS is async thats why we are putting all await , so the reason of async
    it wont wait untill that step is fullfilled it will just give the step to browser and continue to another step
    that is click it will go step by step using asyn, So that this await wait until the operation is 
    completed i.e. oeration in this case is a Promise.

    States Promise :: // promise, pending, reject, fullfill (give status of Promise)

    - If you dont have await it wont wait here it will goto next step i.e. document.click();
    and if its context.waitForEvent('page') send rejected means step fail due to some region 
    if its fullfill than again the click happend after that and the new window opened
    So , we need something both can parallely go : we use Proise.all()

    - retun page in array format
    
*/

/*
PlayWright Inspector Debugging :: Run Demo Test 3 for debug,
- Hover that ele on Ui its hover automatically, here where i am going to perform the next action.
- Read the logs also while debugging, open logs where its waiting to visible ele, ele visible, etc..
- Inspector is also help to create css Ui objects as well on clicking on explore above log 
perform action on Ui and it will give you the UI locator.
- Also you can paste locator to validate on Ui its available or not.
- npx playwright codegen https://google.com, For record & play back 
*/

/*
- Playwright Reports::
I you want a screenshot for every step that you perform will come in use in config file
Test runnning parallely and test file sequentially, takes pass & fail ss.
- Traces downloaded in zip format , what ever you did it will come with a screenshot.
navigate to "trace.playwright.dev" and paste the zip file over there now see logs with each step and ss.

- In Traces Action Before after check log right side 
*/