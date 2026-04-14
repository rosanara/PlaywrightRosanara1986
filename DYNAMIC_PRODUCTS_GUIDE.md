# Dynamic Product Selection - Usage Guide

## Overview
The `ProductsPage` has been enhanced with dynamic product selection methods that pick product names directly from the UI instead of using hardcoded values.

## Available Methods

### 1. **getAllProductNames()** - Get All Products Dynamically
Retrieves all product names available on the page.

```typescript
const allProducts = await productsPage.getAllProductNames();
console.log(allProducts);
// Output: ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt', ...]
```

---

### 2. **addProductToCartByName(productName)** - Add Specific Product
Adds a product to cart by its exact name (pulled from UI).

```typescript
// Add a specific product by name
await productsPage.addProductToCartByName('Sauce Labs Fleece Jacket');

// Dynamic approach: get first product name and add it
const allProducts = await productsPage.getAllProductNames();
await productsPage.addProductToCartByName(allProducts[0]);
```

---

### 3. **addFirstProductToCart()** - Add First Product
Adds the first product from the list to cart automatically.

```typescript
await productsPage.addFirstProductToCart();
```

---

### 4. **addRandomProductToCart()** - Add Random Product
Adds a random product to cart and returns the product name.

```typescript
const addedProduct = await productsPage.addRandomProductToCart();
console.log('Added to cart:', addedProduct);
// Output: "Added to cart: Sauce Labs Bike Light"
```

---

### 5. **addMultipleProductsToCart(productNames)** - Add Multiple Products
Adds multiple products to cart in one call.

```typescript
// Static approach
await productsPage.addMultipleProductsToCart([
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt'
]);

// Dynamic approach: add first 3 products
const allProducts = await productsPage.getAllProductNames();
const firstThree = allProducts.slice(0, 3);
await productsPage.addMultipleProductsToCart(firstThree);
```

---

### 6. **getCartItemCount()** - Get Cart Quantity
Returns the number of items in the cart (from badge).

```typescript
const count = await productsPage.getCartItemCount();
console.log('Items in cart:', count);
```

---

### 7. **addProductToCart()** - Legacy Method
Backward compatible method that adds the default product (Sauce Labs Backpack).

```typescript
await productsPage.addProductToCart(); // Still works as before
```

---

## Advanced Examples

### Example 1: Add Random Products in a Loop
```typescript
test('Add multiple random products', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  
  // Add 5 random products
  for (let i = 0; i < 5; i++) {
    const product = await productsPage.addRandomProductToCart();
    console.log(`Added: ${product}`);
  }

  // Verify cart count
  const count = await productsPage.getCartItemCount();
  expect(count).toBe(5);
});
```

### Example 2: Add Products Based on Names (Dynamic Filter)
```typescript
test('Add only t-shirts and jackets', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  
  const allProducts = await productsPage.getAllProductNames();
  const tShirtsAndJackets = allProducts.filter(
    name => name.includes('T-Shirt') || name.includes('Jacket')
  );
  
  await productsPage.addMultipleProductsToCart(tShirtsAndJackets);
});
```

### Example 3: Add All Products Except One
```typescript
test('Add all products except fleece jacket', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  
  const allProducts = await productsPage.getAllProductNames();
  const productsToAdd = allProducts.filter(
    name => !name.includes('Fleece Jacket')
  );
  
  await productsPage.addMultipleProductsToCart(productsToAdd);
});
```

### Example 4: Sort Products and Add Specific Ones
```typescript
test('Add products in alphabetical order', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  
  const allProducts = await productsPage.getAllProductNames();
  const sorted = allProducts.sort();
  const firstThree = sorted.slice(0, 3);
  
  await productsPage.addMultipleProductsToCart(firstThree);
});
```

---

## Test File Examples

See `dynamicProductSelection.spec.ts` for complete test examples including:
- Getting all products
- Adding specific products by name
- Adding first product
- Adding random products
- Adding multiple products

---

## How It Works

### Behind the Scenes

```typescript
// The method filters products dynamically by content
const productLocator = this.page.locator('[data-test="inventory-item"]').filter({
  hasText: productName,
});

// Then clicks the add-to-cart button within that product container
await productLocator.locator('button[data-test^="add-to-cart"]').click();
```

**Key Features:**
- ✅ No hardcoded product selectors (except containers)
- ✅ Reads product names directly from UI
- ✅ Works even if product list changes
- ✅ Supports dynamic filtering and sorting
- ✅ Backward compatible with existing tests

---

## Benefits

| Feature | Benefit |
|---------|---------|
| **Dynamic Names** | Works with any product name from the UI |
| **No Hardcoding** | Selectors are not tied to specific products |
| **Flexible** | Can add first, last, random, or specific products |
| **Reusable** | Works across multiple tests |
| **Maintainable** | Easy to update if product names change |

---

## Running Dynamic Product Tests

```bash
# Run all dynamic product tests
npm test -- dynamicProductSelection.spec.ts

# Run with headed mode (see browser)
npm run test:headed -- dynamicProductSelection.spec.ts

# Run specific test
npm test -- dynamicProductSelection.spec.ts -g "Should add multiple products"
```
