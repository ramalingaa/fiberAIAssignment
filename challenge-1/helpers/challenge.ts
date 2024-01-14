
import * as fs from 'fs';
import * as path from 'path';
import { decompressAndExtract, downloadFile, parseCSVFile, createTable, batchInsertData } from '.';
import knexModule from 'knex';


// Temporary directory for storing downloaded files
const tmpDir = 'tmp'; 

const knex = knexModule({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname,"..", 'out', 'database.sqlite'),
  },
  useNullAsDefault: true,
});

// Main function that orchestrates the downloading, extraction, parsing, and DB insertion
 export const processDataDump = async (url: string, dbPath: string) => {

  const outputPath = path.join(tmpDir, 'dump.tar.gz');

  try {
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    if (!fs.existsSync(path.dirname(dbPath))) {
      fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    }

    // await downloadFile(url, outputPath);

    // await decompressAndExtract(outputPath, tmpDir);

    const files = fs.readdirSync(tmpDir);
    for (const file of files) {
      if (path.extname(file) === '.csv') {
        console.log(`Processing file: ${file}`);
        const csvFilePath = path.join(tmpDir, file);
        const data = await parseCSVFile(csvFilePath);
        const tableName = path.basename(file, '.csv');
        const sampleData = data[0];
        await createTable(tableName, Object.keys(sampleData), sampleData, knex);

        await batchInsertData(knex, tableName, data);
      }
    }
  } catch (error) {
    console.error('An error occurred during the operation:', error);
  } finally {
    // fs.rmSync(tmpDir, { recursive: true, force: true });
    await knex.destroy();
    console.log('All operations have been completed.');
  }
};
// processDataDump("https://fiber-challenges.s3.amazonaws.com/dump.tar.gz");


