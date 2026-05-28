
class ApiUtils {
   
    constructor(apiContext){
      this.apiContext = apiContext;
    }
   async getToken(){
   const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: loginPayload })
   expect((loginResponse).ok()).toBeTruthy();
   const loginResponseJson= await loginResponse.json();
   tokenIs = await loginResponseJson.token;
   // now take this token and store it into a application local storage.
  // console.log(tokenIs);
    return tokenIs;
    }

    async createOrdrer(){
        const response = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", { data : orderPayload,
            headers : {
                'Authorization' : this.getToken(), // Auth take token as value
                'Content-Type' : 'application/json'
            }
        
        })
        expect((response).ok()).toBeTruthy();
        const res = await response.json();
        const orderId = res.orders[0];
        return orderId;
    }
}
