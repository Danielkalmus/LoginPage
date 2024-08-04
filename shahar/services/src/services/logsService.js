const { createLog } = require('../repositories/logsRepository');

const updateLogs = async (logName, logTime) => {
    if (!logName || !logTime) {
        console.error('missing log info');
        throw new Error('missing log info');
    }
    await createLog(logName, logTime);
};

module.exports = { updateLogs };
