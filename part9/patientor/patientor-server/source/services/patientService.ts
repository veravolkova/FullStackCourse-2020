import patientEntries from '../../data/patients';
import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types';


const getEntries = (): Array<PatientEntry> => {    
    return patientEntries;
  };

const getNonSensitiveEntries = (): NonSensitivePatientEntry [] => {
    return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
  }; 

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
    const newPatientEntry = {
      id: Math.max(...patientEntries.map(p => p.id)) + 1,
      ...entry
    };
  
  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};


const findById = (id: number): PatientEntry | undefined => {
    const entry = patientEntries.find(p => p.id === id);
    return entry;
  };

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById
  };