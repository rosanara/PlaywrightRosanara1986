# SauceDemo Playwright Tests - Implementation Summary

## Overview

Complete Playwright test suite for SauceDemo login functionality with reusable methods for handling both valid and invalid login scenarios.

## Key Components

### 1. Page Object Model (pages/LoginPage.ts)

The `LoginPage` class encapsulates all interactions with the login page:

```typescript
export class LoginPage {
  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly inventoryContainer: Locator;
  readonly inventoryItems: Locator;

  // Methods
  async login(username, password)           // Performs login
  async getErrorMessage()                   // Gets error message text
  async isErrorMessageVisible()             // Checks if error is visible
  async getInventoryItemsCount()            // Returns count of inventory items
  async isInventoryLoaded()                 // Checks if inventory page loaded
  async waitForInventory()                  // Waits for inventory to appear
  async waitForError()                      // Waits for error message
}
```

### 2. Reusable Login Test Method

The `performLoginTest()` function handles both valid and invalid scenarios:

```typescript
async function performLoginTest(page, loginData: LoginTestData)
```

**Features:**
- Takes a single `LoginTestData` object with all test parameters
- Automatically handles valid vs. invalid login flows
- Returns appropriate result object based on scenario
- Reduces code duplication across test cases

**LoginTestData Interface:**
```typescript
interface LoginTestData {
  username: string;
  password: string;
  isValid: boolean;              // true for valid, false for invalid
  expectedItemCount?: number;    // For valid logins
  expectedErrorMessage?: string; // For invalid logins
}
```

**Usage Example:**
```typescript
// Valid login
const testData = {
  username: 'standard_user',
  password: 'secret_sauce',
  isValid: true,
  expectedItemCount: 6,
};
const result = await performLoginTest(page, testData);

// Invalid login
const invalidData = {
  username: 'wrong_user',
  password: 'wrong_pass',
  isValid: false,
  expectedErrorMessage: 'Username and password do not match',
};
const result = await performLoginTest(page, invalidData);
```

## Test Scenarios (7 Total)

### Valid Login Tests (3)
1. **Valid Login - Standard User**
   - Logs in with standard_user / secret_sauce
   - Verifies successful login with 6 items in inventory

2. **Valid Login - Verify Inventory Items After Login**
   - Verifies all 6 items are displayed
   - Checks each item has name and price

3. **Valid Login - Verify Page Title After Login**
   - Confirms "Products" title is displayed

### Invalid Login Tests (4)
1. **Invalid Login - Incorrect Password**
   - Tests with wrong password
   - Verifies error message contains "Username and password do not match"

2. **Invalid Login - Incorrect Username**
   - Tests with invalid username
   - Verifies error message

3. **Invalid Login - Empty Username and Password**
   - Tests with no credentials
   - Verifies "Username is required" error

4. **Invalid Login - Empty Password**
   - Tests with username but no password
   - Verifies "Password is required" error

## Expected Results

| Scenario | Expected Result |
|----------|-----------------|
| Valid Login | Redirect to inventory page with 6 products |
| Invalid Password | Error: "Username and password do not match" |
| Invalid Username | Error: "Username and password do not match" |
| Empty Credentials | Error: "Username is required" |
| Empty Password | Error: "Password is required" |

## How to Run

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run with UI
npm run test:ui

# Run in headed mode
npm run test:headed

# Run specific test
npx playwright test saucedemo.spec.ts -g "Valid Login"
```

## Project Structure

```
playwright_MCP/
├── pages/
│   └── LoginPage.ts              # Page Object for login page
├── tests/
│   └── saucedemo.spec.ts         # Test cases
├── playwright.config.ts          # Configuration
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies
├── .gitignore                    # Git ignore file
├── README.md                     # Usage documentation
└── TEST_SUMMARY.md              # This file
```

## Configuration Details

### Playwright Config (playwright.config.ts)
- **Base URL**: https://www.saucedemo.com/
- **Test Directory**: ./tests
- **Reporters**: HTML report
- **Screenshot**: Captured on failure
- **Trace**: Recorded on first retry
- **Browsers**: Chromium, Firefox, WebKit

### Timeout Settings
- Inventory wait: 10 seconds
- Error wait: 5 seconds
- Element visibility: 5 seconds (default)

## Advantages of This Approach

1. **Code Reusability**: Single `performLoginTest()` method handles all scenarios
2. **Maintainability**: Changes to login flow only need updates in one place
3. **Clear Structure**: Page Object Model separates concerns
4. **Scalability**: Easy to add more test scenarios
5. **Type Safety**: TypeScript interfaces ensure consistent test data
6. **Comprehensive Coverage**: Tests cover both happy and unhappy paths
7. **Better Assertions**: Clear expectation statements make failures obvious

## Credentials

**Valid Test Account:**
- Username: `standard_user`
- Password: `secret_sauce`

---

Created: April 19, 2026
Test Framework: Playwright v1.40.0+
