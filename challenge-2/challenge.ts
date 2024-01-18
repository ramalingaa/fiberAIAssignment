// /**
//  * The entry point function. This will read the provided CSV file, scrape the companies'
//  * YC pages, and output structured data in a JSON file.
//  */
// // export async function processCompanyList() {
// //   /**
// //    * Put your code here!
// //    */
// // }
// import { CheerioCrawler } from 'crawlee';

import { parseCSVFile } from "../challenge-1/helpers";

// // Define the interface for the company data
// interface CompanyProfile {
//     name: string;
//     url: string;
//     // Add more fields as necessary
// }

// // Initialize the CheerioCrawler
// const crawler = new CheerioCrawler({
//     // Configure the crawler as necessary
//     requestHandler: async ({ request, response, body, contentType, $ }) => {
//         // Create an instance of the CompanyProfile
//         const companyProfile: CompanyProfile = {
//             name: $('h1').first().text(),
//             url: request.loadedUrl ? request.loadedUrl : "",
//             // Extract other fields using Cheerio and populate the companyProfile object
//         };

//         // Do something with the companyProfile object, e.g., save it to a file or database
//         console.log("companyProfile: ", companyProfile, "body", body);
//     },
// });

// // Function to start the scraping process
// const startScraping = async () => {
//     // You would load the URLs from the CSV and add them to the crawler queue here
//     await crawler.addRequests(['https://www.ycombinator.com/companies/doordash']);

//     // Start the crawler
//     await crawler.run();
// };

// // Execute the scraping function
// startScraping();
// (async () => {
//     const companyDataList = await parseCSVFile('./inputs/companies.csv');
//     // console.log(companyDataList)
// })()

// src/scraper.ts
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
const outputFilePath = "./output/output.txt"
async function scrapeWebsite(url: string) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    // const companyDescription = $("a").has("href")
    // // //bg-image-twitter for twitter url, bg-image-linkedin
    // // const founderInfo = $(".whitespace-pre-line").text();
    // const $p = $('p');
    // console.log('Data written to:', companyDescription);
    const links = $("a")

        // Loop over all the anchor tags
        links.each((index, value) => {
            // Print the text from the tags and the associated href
            console.log($(value).text(), " => ", $(value).attr("href")?.match("https?://www.linkedin.com/") ? $(value).attr("href") : "https://" + $(value).attr("href"));
        })
  } catch (error) {
    console.error('Error:', error);
  }
}

const targetUrl = 'https://www.ycombinator.com/companies/fiber-ai';
scrapeWebsite(targetUrl);
