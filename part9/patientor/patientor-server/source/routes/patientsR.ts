import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntryWithTypes } from '../utils';  

const router = express.Router();

router.get('/', (_req, res) => {  
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);      
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message); 
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    const newEntry = toNewEntryWithTypes(req.body); 
    const updatedPatient = patientService.addEntry(patient, newEntry);
    res.json(updatedPatient);
  } else {
    res.sendStatus(404);
  }
});

export default router;

