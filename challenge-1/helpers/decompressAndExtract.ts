import * as fs from 'fs';
import * as zlib from 'zlib';
import * as tar from 'tar';

// Function to decompress and extract the tar.gz file

export const decompressAndExtract = (tarballPath: string, extractDir: string): Promise<void> => {
    console.log("----Decompress starting---");
    return new Promise((resolve, reject) => {
      fs.createReadStream(tarballPath)
        .pipe(zlib.createGunzip())
        .pipe(tar.extract({
          cwd: extractDir,
          filter: (path, stat) => {
            // Exclude files starting with `._`, at any directory level
            return !/(^|\/)\._/.test(path);
          },
          onentry: (entry) => {
            // This will remove the first segment of the path (e.g. 'dump/') for each entry
            if (!/(^|\/)\._/.test(entry.path)) {
              entry.path = entry.path.replace(/^([^\/]+\/)/, '');
            }
          }
        })).on('error', (error) => {
          console.error("Error during decompression:", error);
          reject(error);
        })
        .on('end', () => {
          console.log("----Decompress Completed---");
          resolve();
        });
    });
  };