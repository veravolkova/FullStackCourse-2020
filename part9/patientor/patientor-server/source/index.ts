import express from 'express';
import diagnosesRouter from './routes/diagnosesR';
import patientsRouter from './routes/patientsR';
const app = express();
app.use(express.json());

import cors from "cors";

app.use(cors());

const PORT = 3001;

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});