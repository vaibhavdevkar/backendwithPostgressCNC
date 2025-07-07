// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors")



app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const partRoutes = require('./routes/partRoutes');
const machineRoutes = require('./routes/machineRoutes');
const lineRoutes = require('./routes/lineRoutes');
const processRoutes = require('./routes/processRoutes');
const setupRoutes = require('./routes/setupRoutes');


app.use('/api/setups', setupRoutes);
app.use('/api/machines', machineRoutes);
app.use('/api/parts', partRoutes);
app.use('/api/lines', lineRoutes);
app.use('/api/processes', processRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`🛠️  Part-Master API listening on port ${PORT}`);
});
