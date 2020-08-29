import patientEntries from '../../data/patients';
import { PatientNonSensitive, Patient, NewPatientEntry } from '../types';


const getEntries = (): Array<Patient> => {    
    return patientEntries;
  };

const getNonSensitiveEntries = (): PatientNonSensitive [] => {
    return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
  }; 

const addPatient = ( entry: NewPatientEntry ): Patient => {
    const newPatientEntry = {
      id: (patientEntries.length + 1).toString(),
      ...entry
    };
  
  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};


const findById = (id: string): Patient | undefined => {
    const entry = patientEntries.find(p => p.id === id);
    return entry;
  };

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById
  };

  
