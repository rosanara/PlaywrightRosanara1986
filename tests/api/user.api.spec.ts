import {test,expect,request} from '@playwright/test';

test.describe("Rest API demo",() => {
    
const baseURL = 'https://reqres.in/api';
test('should Get list of user',async({request})=>{

    const response = await request.get(`${baseURL}/users?page=2`,{
        headers:{
            'x-api-key':'reqres-free-v1'
           }
            });
    expect(response.status()).toBe(200);  
    const cdata = await response.json();

    console.log(`Response Body: ${JSON.stringify(cdata)}`);
      
    const responseBody = await response.json();
  
    console.log(`User Details: ID \n - ${await responseBody.data[1].id}, Email \n - ${await responseBody.data[1].email}`);
});

//post user
test('Should create a user',async({request})=>{

    //create a playload body

    const playload = {
	"name": "Alex",
    "job":  "Developer",
    "id":   "124",
    "createdAt": "2025-06-10T02:35:49.872Z"
};

    const response = await request.post(`${baseURL}/users`,{
        headers:{
        "x-api-key":"reqres-free-v1",
        "Content-Type":"application/json"
           },
           data:playload
            });
    expect(response.status()).toBe(201); 
    const cdata = await response.json();

    console.log(`Response Body: ${JSON.stringify(cdata)}`);
      
    const responseBody = await response.json();
  
    console.log(`User Details: ID \n - ${await responseBody.data[1].id}, Email \n - ${await responseBody.data[1].email}`);
});
});