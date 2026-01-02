import {test,expect }from '@playwright/test';
import { PracticeAutomation, SearchResultsPage } from '../PageObjects/practiceAutomation';

//navigate to url : http://www.automationpractice.pl/index.php
//validate the url 
// enter the search item in the search box as T-shirt
// click on serach button 
//verify system display the search results

test(`search T-shitt verify it should display the results`,async ({page})=>{
const practiceAutomation = new PracticeAutomation(page);
const searchResultsPage = new SearchResultsPage (page);
await practiceAutomation .navigateToHomePage();
await expect(page).toHaveURL('http://www.automationpractice.pl/index.php');
await practiceAutomation.searchTShirt('Faded Short Sleeve T-shirts');
await searchResultsPage.verifySearchResults('Faded Short Sleeve T-shirts'); 

})