# SauceDemo Playwright Tests

Automated test suite for SauceDemo (https://www.saucedemo.com/) using Playwright.

## Test Scenarios Covered

### Valid Login Tests
1. **Valid Login - Standard User**: Tests login with valid credentials (standard_user / secret_sauce) and verifies successful login
2. **Valid Login - Verify Inventory Items After Login**: Verifies that 6 items are displayed in the inventory after successful login
3. **Valid Login - Verify Page Title After Login**: Confirms the page title displays "Products" after login

### Invalid Login Tests
1. **Invalid Login - Incorrect Password**: Verifies error message when wrong password is provided
2. **Invalid Login - Incorrect Username**: Verifies error message when invalid username is provided
3. **Invalid Login - Empty Username and Password**: Confirms "Username is required" error
4. **Invalid Login - Empty Password**: Confirms "Password is required" error

## Project Structure

```
playwright_MCP/
├── pages/
│   └── LoginPage.ts          # Page Object Model for login page
├── tests/
│   └── saucedemo.spec.ts     # Test scenarios
├── playwright.config.ts      # Playwright configuration
├── package.json              # Project dependencies
└── README.md                 # This file
```

## Installation

```bash
npm install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests with UI
```bash
npm run test:ui
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run specific test
```bash
npx playwright test saucedemo.spec.ts
```

## Key Features

### Reusable Login Method
The `performLoginTest()` method handles both valid and invalid login scenarios:
- Takes a `LoginTestData` object with username, password, validity flag, and expected results
- Returns appropriate results based on whether login is expected to be valid or invalid
- Reduces code duplication and improves maintainability

### Page Object Model
- **LoginPage.ts**: Encapsulates all login page interactions
  - Locators for username, password, login button, error message, and inventory
  - Methods for login, error checking, and inventory verification
  - Wait conditions for element visibility

### Test Data Interface
```typescript
interface LoginTestData {
  username: string;
  password: string;
  isValid: boolean;
  expectedItemCount?: number;
  expectedErrorMessage?: string;
}
```

## Credentials

### Valid Credentials
- **Username**: standard_user
- **Password**: secret_sauce

## Expected Results

- **Valid Login**: User is redirected to inventory page with 6 products displayed
- **Invalid Login**: Error message "Username and password do not match any user in this service" is displayed
- **Empty Fields**: Appropriate error message is shown (username/password required)

## Browser Support

Tests run on:
- Chromium
- Firefox
- WebKit (Safari)

## Reports

After running tests, an HTML report is generated in the `playwright-report` folder. Open it with:
```bash
npx playwright show-report
```

## Notes

- Tests include screenshots on failure
- Traces are recorded on first retry for debugging
- Tests are configured with appropriate timeouts for element visibility
