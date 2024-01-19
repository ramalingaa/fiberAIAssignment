import { processDataDump } from '../challenge';
import * as fs from 'fs';

describe('processDataDump', () => {

  it('should create a database if the dbPath does not exist', async () => {
    // Arrange
    const url = 'https://example.com/data.tar.gz';
    const dbPath = './data/database.sqlite';

    // Act
    await processDataDump(url, dbPath);

    // Assert
    // Check if the database file is created at the specified location
    expect(fs.existsSync('./data/database.sqlite')).toBe(true);
  });
  it('should create a tmp directory if the tmp directory does not exist', async () => {
    // Arrange
    const url = 'https://example.com/data.tar.gz';
    const dbPath = './data/database.sqlite';

    // Act
    await processDataDump(url, dbPath);

    // Assert
    // Check if the database file is created at the specified location
    expect(fs.existsSync('./tmp')).toBe(true);
  });

  // Add more test cases as needed
});