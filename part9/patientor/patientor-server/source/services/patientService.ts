import patientEntries from '../../data/patients';
import { PatientNonSensitive, Patient, NewPatientEntry, NewEntry } from '../types';

import { uuid } from 'uuidv4';

const getEntries = (): Array<Patient> => {    
    return patientEntries;
  };

const getNonSensitiveEntries = (): PatientNonSensitive [] => {
    return patientEntries.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
    }));
  }; 

const addPatient = ( patient: NewPatientEntry ): Patient => {
    const newPatient = {
      id: uuid(),
      entries: [],
      ...patient
    };
  
  patientEntries.concat(newPatient);
  return newPatient;
};


const addEntry = ( patient: Patient, entry: NewEntry  ): Patient => {
  
const newEntry =  {  
      ...entry,
      id: uuid(),    
  };  

  const updatedPatient = {
    ...patient,
    entries: patient.entries.concat(newEntry)
  };

  return updatedPatient;
};  

const findById = (id: string): Patient | undefined => {
    const entry = patientEntries.find(p => p.id === id);
    return entry;
  };

export default {
  getEntries,
  addPatient,
  addEntry,
  getNonSensitiveEntries,
  findById
  };

  
