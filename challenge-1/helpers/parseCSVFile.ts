import * as fs from 'fs';
import {parse} from 'papaparse';


// Function to parse a CSV file
export const parseCSVFile = (csvFilePath: string): Promise<any[]> => {
    console.log("----parsingCSV starting---")
  
    return new Promise((resolve, reject) => {
      const data: any[] = [];
  
      const fileStream = fs.createReadStream(csvFilePath);
      
      parse(fileStream, {
        header: true, // or false if you want array of arrays without keys
        step: (result) => {
          data.push(result.data);
        },
        complete: () => {
          resolve(data);
          console.log("----parsingCSV Completed---")
  
        },
        error: (error) => {
          reject(error);
          console.log("----parsingCSV failed---")
  
        }
      });
    });
  };