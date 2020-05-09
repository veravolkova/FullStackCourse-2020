import diagnoseEntries from '../../data/diagnoses';

import { DiagnoseEntry } from '../types';


const getEntries = (): Array<DiagnoseEntry> => {    
    return diagnoseEntries;
  };

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};