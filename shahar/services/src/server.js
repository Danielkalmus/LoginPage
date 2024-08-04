const express = require('express');
const bodyParser = require('body-parser');
const logsRoute = require('./routes/logsRoute');
const { pool } = require('./services/database.service'); 

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api/splunk', logsRoute);


app.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM s_training_db.logs');
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
