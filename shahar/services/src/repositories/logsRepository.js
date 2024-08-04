const { pool } = require('../services/database.service');

const createLog = async (logName, logTime) => {
    await pool.query(
        'INSERT INTO s_training_db.logs (log_name, log_time) VALUES (?, ?)',
        [logName, logTime]
    );
};

module.exports = { createLog };
