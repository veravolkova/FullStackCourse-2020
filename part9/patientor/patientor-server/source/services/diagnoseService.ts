import diagnoseEntries from '../../data/diagnoses';

import { DiagnoseEntry } from '../types';


const getEntries = (): Array<DiagnoseEntry> => {    
    return diagnoseEntries;
  };

const addEntry = () => {
  return null;
};

const findById = (id: number): DiagnoseEntry | undefined => {
  const entry = diagnoseEntries.find(d => d.id === id);
  return entry;
};

export default {
  getEntries,
  addEntry,
  findById
};