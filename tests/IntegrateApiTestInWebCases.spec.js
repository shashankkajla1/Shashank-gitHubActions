/*
const {test, expect, request } = require('@playwright/test');

const loginPayload={
    userEmail : "shashankkajla1@gmail.com",
    userPassword : "Test1234"
}
const orderPayload = { orders :[{country: "India", productOrderedId:"6960eac0c941646b7a8b3e68"}]};

let tokenIs;
let orderId;
// run only once
test.beforeAll(async ()=>{

const apiContext = await request.newContext();


//** Post call to create order

//console.log(orderId);
//console.log(JSON.stringify(res));

})
// Run for before every tests
test.beforeEach(async ()=>{

})

test('Web Api in UI & Order check using Api', async({page})=>{

    const apiUtils = new ApiUtils(apiContext);
   // local storage key name should be same as in application while inspecting
    await page.addInitScript(value =>{
        window.localStorage.setItem('token', value);
    }, tokenIs)
    await page.goto('https://rahulshettyacademy.com/client/dashboard/dash');
    await page.waitForTimeout(3000);
    await page.waitForLoadState('networkidle');
    const content = await page.locator("//button[@class='btn btn-custom']").allTextContents();
    console.log(content);

    // ** Now place ordr using Api
    // Also how this order is tied up with his guy as we have 2 users in application
    // 1st created order - shashank, now i also need to know that order is created by shashank user not other one (autherization)
    // 2nd user : Ansh won't see that order in his history coz. its different user.
    // So this autherization i am sending as a token as a key and toke as value with shashank user as a value autherization see in request header while creating order,
    // and that token for that user same used above is also stored in local storage of application.
    
    //So first you login and save that token and that token will pass in request header
    // as a authenticated user and create the order and then validate the order id.

// ** Check for placed order, always remove order before running script
    await page.locator("//*[@class='btn btn-custom']").nth(1).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'View' }).click();
    await page.waitForTimeout(3000);
    const fetchedId = await page.locator(".col-text").textContent();
    console.log(fetchedId);
    console.log(orderId);
    expect(orderId.includes(fetchedId)).toBeTruthy();
})

*/
