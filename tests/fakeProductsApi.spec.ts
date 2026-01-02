import { test, expect } from '@playwright/test';
import Ajv from "ajv";
const ajv = new Ajv();


//call the API : https://fakestoreapi.com/products/1
//validate the response status code is 200
// parse response body
//validate response content required fields id,title,price,description,category,image,rating
//validate schema using ajv
//log product details 

//schema for [prodcuct response
const productSchema = {
    type: "object",
    required: ["id", "title", "price", "description", "category"],
    properties: {
        id: { type: "number" },
        title: { type: "string" },
        price: { type: "number" },
        description: { type: "string" },
        category: { type: "string" },
    }
}
test('should fetch product and validate its data ', async ({ request }) => {

    // send GET request to end point 
    const response = await request.get('https://fakestoreapi.com/products/1');
    const responseBody = await response.json();
    //validate response contains required fields
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('title');
    expect(responseBody).toHaveProperty('price');
    expect(responseBody).toHaveProperty('description');
    expect(responseBody).toHaveProperty('category');

    //validate schema using ajv
    const validate = ajv.compile(productSchema);

    const valid = validate(responseBody);
    expect(valid).toBeTruthy();
    if (valid) {
        console.log('Product Details:');
        console.log(`ID: ${responseBody.id}`);
        console.log(`Title: ${responseBody.title}`);
        console.log(`Price: ${responseBody.price}`);
        console.log(`Description: ${responseBody.description}`);
        console.log(`Category: ${responseBody.category}`);
        console.log('Schema validation error', validate.errors);
    }

    //log product details 
    console.log(`product: ${responseBody.title}, price: $${responseBody.price}`);

});