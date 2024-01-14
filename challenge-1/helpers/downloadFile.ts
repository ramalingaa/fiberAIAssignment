import * as https from 'https';
import * as fs from 'fs';

// Function to download a file
export const downloadFile = (url: string, dest: string): Promise<void> => {
    console.log("----Download starting---")
  
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(dest);
      https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close((err?: NodeJS.ErrnoException | null) => { // Allow err to be undefined as well
            if (err) {
              reject(err);
            } else {
              resolve();
              console.log("----Download Completed---")
  
            }
          });
        });
      }).on('error', (err: NodeJS.ErrnoException) => {
        fs.unlink(dest, (unlinkErr) => {
          if (unlinkErr) console.error(`Failed to delete ${dest}:`, unlinkErr);
          reject(err);
        }); // Handle unlink error scenario
      });
    });
  };