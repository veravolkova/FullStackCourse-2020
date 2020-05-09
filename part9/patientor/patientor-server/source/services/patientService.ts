import patientEntries from '../../data/patients';
import { NonSensitivePatientEntry, PatientEntry } from '../types';


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

const addEntry = () => {
  return null;
  };

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries
  };