import  { Knex } from 'knex';

//create data base table with type check 
export const createTable = async (tableName: string, headers: string[], sampleData: Record<string, any>, knex: Knex) => {
    console.log("----tanle creation started---")
  
  
    await knex.schema.dropTableIfExists(tableName);
    await knex.schema.createTable(tableName, (table) => {
      headers.forEach((header) => {
        // Determine the type based on the sample data
        const sampleValue = sampleData[header];
        if (typeof parseFloat(sampleValue) === 'number' && isFinite(parseFloat((sampleValue)))){
            // The string represents a number, now check if it's an integer or float
          const numValue = parseFloat(sampleValue);
          if (Number.isInteger(numValue)) {
            // Check if the integer is within the safe range
            if (Number.isSafeInteger(numValue)) {
              // It's a safe integer, use 'integer' type.
              table.integer(header);
            } else {
              // It's an integer but not safe, use 'bigInteger'.
              table.bigInteger(header);
            }
          } else {
            // It's a floating-point number, use 'float'.
            table.float(header);
          }
        } else if (typeof sampleValue === 'boolean') {
          table.boolean(header);
        } else if (!isNaN(Date.parse(sampleValue)) && Date.parse(sampleValue) > 0) {
          // Check if the sample value is a valid date
          table.dateTime(header);
        } else if (typeof sampleValue === 'string') {
            table.text(header);
        } else {
          // Fallback to text if type is unknown
          table.text(header);
        }
      });
      console.log("----tanle creation completed---")
  
    });
  };