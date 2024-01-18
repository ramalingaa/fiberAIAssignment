import { processDataDump } from "./challenge";
import { DUMP_DOWNLOAD_URL, SQLITE_DB_PATH } from "./resources";

/**
 * This is the entry point for the challenge.
 * This will run your code.
 */

(async ( ) => {
    try {
        await processDataDump(DUMP_DOWNLOAD_URL, SQLITE_DB_PATH);
        console.log("All operations have been completed. ✅ Done!");

    } catch (error) {
        console.error(error);
    }
})();
