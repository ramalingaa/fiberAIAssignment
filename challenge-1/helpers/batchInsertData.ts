import  { Knex } from 'knex';

//insert data into table in batches of 100 each
export const batchInsertData = async (knex: Knex, tableName: string, data: any[], batchSize: number = 100) => {
    console.log("----table insert data started---");
  
    // Start a transaction
    await knex.transaction(async (trx) => {
      const chunkPromises = [];
      for (let i = 0; i < data.length; i += batchSize) {
        const batch = data.slice(i, i + batchSize);
        // Use the transaction object for the batch insert
        chunkPromises.push(knex.batchInsert(tableName, batch).transacting(trx));
      }
      // Execute all batch inserts within the transaction
      await Promise.all(chunkPromises);
  
      // If all batch inserts are successful, commit the transaction
      await trx.commit();
    }).catch(async (error) => {
      // If any error occurred during the inserts, the transaction is automatically rolled back
      console.error("----table insert data failed---", error);
      throw error; // Rethrow or handle the error as needed
    });
  
    console.log("----table insert data completed---");
  };