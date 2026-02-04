# 🔗 Broken Links Automation – Playwright + TypeScript

## 📌 Overview
This project automates the validation of broken links on web pages using **Playwright with TypeScript**.  
The automation scans all anchor links, sends HTTP requests, and reports links that return error status codes (4xx ).

This helps ensure website link integrity and improves user experience.

## 🧰 Tech Stack
- Playwright
- TypeScript
- Node.js
- Playwright Test Runner
- HTML Reporter

## 🎯 Test Objective
- Extract all links from a given page
- Validate each link response
- Detect broken links
- Capture HTTP status codes
- Generate execution report

## 📂 Project Structure

tests/
brokenlinks.spec.ts

playwright.config.ts

## Run command with Headed mode 

npx playwright test tests/brokenlinks.spec.ts --headed
## Run command with Headless 
npx playwright test tests/brokenlinks.spec.ts 
## view TestReport :
npx playwright show-report