import { processDataDump } from "./helpers/challenge";
import { DUMP_DOWNLOAD_URL, SQLITE_DB_PATH } from "./resources";

/**
 * This is the entry point for the challenge.
 * This will run your code.
 */

(async ( ) => {
    await processDataDump(DUMP_DOWNLOAD_URL, SQLITE_DB_PATH);
    console.log("✅ Done!");
})();
