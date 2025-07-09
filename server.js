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
const shiftRoutes = require("./routes/shiftRoutes")
const pmcparameterRoutes = require("./routes/pmcParameterRoutes")
const documentRoutes = require("./routes/documentRoutes")
const skillMatrixRoutes = require("./routes/skillMatrixRoutes")
const userRoutes = require("./routes/userRoutes")
const toolRoutes = require("./routes/toolRoutes")


app.use('/api/setups', setupRoutes);
app.use('/api/machines', machineRoutes);
app.use('/api/parts', partRoutes);
app.use('/api/lines', lineRoutes);
app.use('/api/processes', processRoutes);
app.use('/api/shifts', shiftRoutes)
app.use('/api/pmc-parameters', pmcparameterRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/skills', skillMatrixRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tools', toolRoutes);


const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`🛠️  Part-Master API listening on port ${PORT}`);
});
