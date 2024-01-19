import knex, { Knex } from 'knex';
import { batchInsertData } from '../helpers/batchInsertData';

describe('batchInsertData', () => {
  let testDb: Knex;

  beforeAll(async () => {
    // Set up a test database connection
    testDb = knex({
      // Configure the test database connection
      // For example, you can use an in-memory SQLite database
      client: 'sqlite3',
      connection: {
        filename: ':memory:',
      },
      useNullAsDefault: true,
    });

    // Create the test table
    await testDb.schema.createTable('myTable', (table) => {
      table.increments('id').primary();
      table.string('name');
    });
  });

  afterAll(async () => {
    // Drop the test table and disconnect from the test database
    await testDb.schema.dropTableIfExists('myTable');
    await testDb.destroy();
  });

  it('should insert data into table in batches of 100', async () => {
    // Arrange
    const tableName = 'myTable';
    const data = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
    const batchSize = 100;

    // Act
    await batchInsertData(testDb, tableName, data, batchSize);

    // Assert
    // Add assertions to verify that the data was inserted correctly
  });
});