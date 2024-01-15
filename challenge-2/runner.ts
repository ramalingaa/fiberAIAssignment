// import { processCompanyList } from "./challenge";

// /**
//  * This is the entry point for the challenge.
//  * This will run your code.
//  */
// await processCompanyList();
// console.log("✅ Done!");
import {gotScraping} from 'got-scraping';

//create async function to get data from url with self calling
const fetchData = async () => {
  try {
    // Get the HTML of a web page
    const response = await gotScraping({ url: 'https://www.ycombinator.com/companies/doordash' });
    console.log(response);
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
  }
};

// Call the fetchData function
fetchData();

// Get the HTML of a web page
