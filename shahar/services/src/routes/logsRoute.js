const express = require('express');
const { updateLogs } = require('../services/logsService');

const router = express.Router();

router.post('/update', async (req, res) => {
  const { logName, logTime } = req.body;
  try {
    await updateLogs(logName, logTime);
    res.status(200).json({ success: true });
  } catch (err) {
    if (err instanceof Error && err.message === 'missing log info') {
      res.status(404).json({ success: false, message: err.message });
    } else {
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
});

module.exports = router;
