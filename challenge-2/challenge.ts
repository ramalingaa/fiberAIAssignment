/**
 * The entry point function. This will read the provided CSV file, scrape the companies'
 * YC pages, and output structured data in a JSON file.
 */
// export async function processCompanyList() {
//   /**
//    * Put your code here!
//    */
// }
import { CheerioCrawler } from 'crawlee';

// Define the interface for the company data
interface CompanyProfile {
    name: string;
    url: string;
    // Add more fields as necessary
}

// Initialize the CheerioCrawler
const crawler = new CheerioCrawler({
    // Configure the crawler as necessary
    requestHandler: async ({ request, response, body, contentType, $ }) => {
        // Create an instance of the CompanyProfile
        const companyProfile: CompanyProfile = {
            name: $('h1').first().text(),
            url: request.loadedUrl ? request.loadedUrl : "",
            // Extract other fields using Cheerio and populate the companyProfile object
        };

        // Do something with the companyProfile object, e.g., save it to a file or database
        console.log("companyProfile: ", companyProfile, "body", body);
    },
});

// Function to start the scraping process
const startScraping = async () => {
    // You would load the URLs from the CSV and add them to the crawler queue here
    await crawler.addRequests(['https://www.ycombinator.com/companies/doordash']);

    // Start the crawler
    await crawler.run();
};

// Execute the scraping function
startScraping();