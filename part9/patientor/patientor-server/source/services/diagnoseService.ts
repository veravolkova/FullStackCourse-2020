import diagnoseEntries from '../../data/diagnoses';

import { Diagnosis } from '../types';


const getEntries = (): Array<Diagnosis> => {    
    return diagnoseEntries;
  };


const findByCode = (code: string): Diagnosis | undefined => {
  const entry = diagnoseEntries.find(d => d.code === code);
  return entry;
};

export default {
  getEntries, 
  findByCode
};