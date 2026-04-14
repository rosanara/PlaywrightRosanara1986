# Playwright Automation - Sauce Demo Testing

## Project Overview
This project automates testing for the Sauce Demo application (https://www.saucedemo.com) using Playwright with a Page Object Model (POM) pattern.

## Project Structure
```
NousTest/
├── config/
│   └── config.ts            # Environment configuration loader
├── pages/
│   ├── BasePage.ts          (Base class with common methods)
│   ├── LoginPage.ts         (Login functionality)
│   ├── ProductsPage.ts      (Product browsing)
│   ├── CartPage.ts          (Shopping cart)
│   └── CheckoutPage.ts      (Checkout process)
├── testData/
│   └── testData.json        (Test data for checkout info)
├── tests/
│   ├── purchaseFlow.spec.ts        (Main test: successful purchase)
│   └── negativeScenarios.spec.ts   (Invalid login + missing zip code)
├── .env                     (Environment variables - Keep SECRET)
├── .env.example             (Template for .env)
├── .gitignore               (Git ignore patterns)
├── playwright.config.ts     (Chromium only configuration)
├── package.json
└── README.md
```

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

This will install `@playwright/test`, `dotenv`, and other dependencies.

### 2. Configure Environment Variables
Create a `.env` file in the project root (copy from `.env.example`):
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```
SAUCE_DEMO_URL=https://www.saucedemo.com
VALID_USERNAME=standard_user
VALID_PASSWORD=secret_sauce
INVALID_USERNAME=invalid_user
INVALID_PASSWORD=wrong_password
```

### 3. Install Playwright Browsers
```bash
npx playwright install
```

This downloads the Chromium browser for testing.

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in UI Mode (Visual Debugging)
```bash
npm run test:ui
```

### Run Tests in Headed Mode (See Browser)
```bash
npm run test:headed
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```


### Generate Test Code (Codegen)
```bash
npm run codegen
```

This opens an interactive tool to record and generate test code.

## Test Cases

### Main Test: Successful Purchase Flow (`purchaseFlow.spec.ts`)
✅ **Scenario**: Complete end-to-end purchase flow
1. Navigate to Sauce Demo
2. Login with credentials: `standard_user` / `secret_sauce`
3. Add Sauce Labs Backpack to cart
4. Verify product appears in cart
5. Proceed to checkout
6. Enter checkout information
7. Complete purchase
8. Assert "Thank you for your order!" message displays

### Negative Tests (`negativeScenarios.spec.ts`)

**Test 1: Invalid Login**
- Attempt login with invalid credentials
- Verify error message: "Username and password do not match"

**Test 2: Checkout Without Zip Code**
- Login successfully
- Add product to cart
- Proceed to checkout
- Enter First Name and Last Name only (skip Zip Code)
- Verify error message: "Postal Code is required"

## Page Object Model Implementation

### BasePage
Base class containing common methods used across all pages:
- `goto(url)` - Navigate to URL
- `fill(selector, text)` - Fill input field
- `click(selector)` - Click element
- `getText(selector)` - Get element text
- `isVisible(selector)` - Check if element is visible
- `waitForSelector(selector)` - Wait for element to appear

### Page Objects
Each page extends `BasePage` and contains:
- Selectors specific to that page
- Methods to interact with that page

## Configuration Details

**Browser**: Chromium only
**Parallel Execution**: Disabled (sequential execution)
**Retries**: 0 (can be adjusted in config)
**Screenshots**: Only on failure
**Videos**: Retained on failure
**Trace**: On first retry

## Environment Configuration

All sensitive information (credentials and URLs) is stored in `.env` file and loaded via the `config/config.ts` module using `dotenv`.

**Config Variables:**
- `SAUCE_DEMO_URL` - Application URL
- `VALID_USERNAME` - Valid test user username
- `VALID_PASSWORD` - Valid test user password
- `INVALID_USERNAME` - Invalid test user (for negative tests)
- `INVALID_PASSWORD` - Invalid test password (for negative tests)

The `.env` file is ignored in version control (see `.gitignore`) to prevent exposing credentials.



**Browser not found?**
- Run: `npx playwright install`

