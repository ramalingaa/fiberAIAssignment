
import * as fs from 'fs';
import * as path from 'path';
import { decompressAndExtract, downloadFile, parseCSVFile, createTable, batchInsertData } from './helpers';
import knexModule from 'knex';


// Temporary directory for storing downloaded files
const tmpDir = 'tmp'; 

const knex = knexModule({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, 'out', 'database.sqlite'),
  },
  useNullAsDefault: true,
});

// Main function that orchestrates the downloading, extraction, parsing, and DB insertion
 export const processDataDump = async (url: string, dbPath: string) => {
  const outputPath = path.join(tmpDir, 'dump.tar.gz');
  if (!dbPath) {
    dbPath = './out/database.sqlite';
  } else {
    const dbFolder = path.dirname(dbPath);
    if (!fs.existsSync(dbFolder)) {
      fs.mkdirSync(dbFolder, { recursive: true });
    }
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, '', { flag: 'wx' });
    }
  };
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  if (!fs.existsSync(path.dirname(dbPath))) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  };
  try {
    // downloads the file and stores it in the temporary directory
    await downloadFile(url, outputPath);
    //extracts the file and stores it in the temporary directory
    await decompressAndExtract(outputPath, tmpDir);
    const files = fs.readdirSync(tmpDir);
    //iterates over the extracted CSV files in the temporary directory and processes them
    for (const file of files) {
      if (path.extname(file) === '.csv') {
        console.log(`Processing file: ${file}`);
        const csvFilePath = path.join(tmpDir, file);
        //parses the CSV file and returns the data in an array
        const data = await parseCSVFile(csvFilePath);
        const tableName = path.basename(file, '.csv');
        const sampleData = data[0];
        //creates the table in the database with the headers and sample data
        await createTable(tableName, Object.keys(sampleData), sampleData, knex);
        //inserts the data into the table in the database as batches of 100
        await batchInsertData(knex, tableName, data);
      }
    }
  } catch (error) {
    console.error('An error occurred during the operation:', error);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    await knex.destroy();
  }
};
// processDataDump("https://fiber-challenges.s3.amazonaws.com/dump.tar.gz", './out/database.sqlite');


