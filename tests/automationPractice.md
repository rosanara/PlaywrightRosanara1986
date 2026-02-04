# 📘 Page Object Model (POM) Using Playwright + TypeScript

## 📌 Overview

Page Object Model (POM) is a design pattern used in test automation to improve test maintainability, readability, and reusability.  
In Playwright, POM helps separate **page interactions** from **test logic**.

Each web page is represented as a class, and UI elements + actions are defined as methods inside that class.

---
## 🎯 Benefits of POM

- ✅ Better code organization
- ✅ Reusable page methods
- ✅ Reduced duplication
- ✅ Easier maintenance
- ✅ Improved readability
- ✅ Faster framework scaling
- ✅ Clear separation of concerns

## project structure 
TYPESCRIPT/
│
├── PageObjects/
││ ├── PracticeAutomation.ts
│
├── tests/
│ ├── automationpractice.spec.ts
│
├── playwright.config.ts

## Best Practices for Playwright POM

1.Keep locators inside page classes only
2.Do not write assertions inside page objects
3.Keep page methods action-focused
4.Use meaningful method names
5.Avoid hard-coded waits
6.Use Playwright locators instead of selectors where possible
7.Use fixtures for page object injection (advanced setup)

# run commdand 
two approach we can run using the below command 
 ## Direct command in cli /terminal 
 npx playwright test tests/automationpractice.spec.ts

## configure the run command in package.json

2. npm run pageObject

