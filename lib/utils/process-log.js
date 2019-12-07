/* eslint-disable @typescript-eslint/explicit-function-return-type */
function logErrorAndExit(error) {
    if (error && error.stack) process.cliLogger.error(error.stack);
    process.exit(1);
}

process.on('uncaughtException', error => {
    process.cliLogger.error(`Uncaught exception: ${error}`);
    logErrorAndExit(error);
});

process.on('unhandledRejection', error => {
    process.cliLogger.error(`Promise rejection: ${error}`);
    logErrorAndExit(error);
});

function stdWrite(s) {
    if (typeof s === 'string') {
        process.stdout.write(s);
    }
    return;
}

//TODO: implement logger for debug

module.exports = {
    stdWrite,
};
