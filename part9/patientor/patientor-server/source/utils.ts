/* eslint-disable @typescript-eslint/no-explicit-any */

import { EntryType, Diagnosis, Discharge, Gender, HealthCheckRating, NewPatientEntry, NewEntry, NewBaseEntry, SickLeave } from './types'; 

//type guards
const isString = (text: any): text is string => {
    return typeof text === 'string';
  };

const isStringArray = (param: any[]): param is string[] => {
  return Array.isArray(param) && param.every(item => typeof item === 'string');
};
 
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const isSickLeave = (object: any): SickLeave => {
  return object;
};

const isDischarge = (object: any): Discharge => {
  return object;
};

const isEntryType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

export const parseToString = (param: any, ): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing param: ' + param);
  }

  return param;  
};

export const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }

    return date;
  };

export const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    } 

    return gender;
  };

const parseEntryType = (entryType: any): EntryType => {
    if (!entryType || !isEntryType(entryType)) {
        throw new Error('Incorrect or missing entry type');
    } 

    return entryType;
  };
 

  export const toNewPatientEntry = (object: any): NewPatientEntry => {  
    return {
        ssn: parseToString(object.ssn),
        name: parseToString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseToString(object.occupation)                
    };
  };   
 
  const parseSickLeave = (sickLeave: any): SickLeave => {
    if (!sickLeave || !isSickLeave(sickLeave)) {
        throw new Error('Incorrect or missing sick leave field');
    } 

    return sickLeave;
  };

  const parseDischarge = (discharge: any): Discharge => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error('Incorrect or missing discharge leave field');
    } 

    return discharge;
  };  
  
  const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
    if (!healthCheckRating || !isHealthCheckRating(HealthCheckRating)) {
        throw new Error('Incorrect or missing health check rating field');
    } 

    return healthCheckRating;
  };
 
  const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
    if (isStringArray(diagnosisCodes)) {
      throw new Error('Incorrect or missing diagnoses');
    }
  
    return diagnosisCodes;
  };
  
 const toNewBaseEntry = (object: any): NewBaseEntry => {
    return {
      type: parseEntryType(object.type),
      description: parseToString(object.description),
      date: parseDate(object.date),
      specialist: parseToString(object.specialist),  
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)       
     };      
  };  

 
 export const toNewEntryWithTypes = (object: any): NewEntry => {  

      toNewBaseEntry(object);
        
      if(object.type === EntryType.HealthCheck) {
        return {...object, healthCheckRating: parseHealthCheckRating(object.healthCheckRating)};
      }
      else if(object.type === EntryType.OccupationalHealth) {
        return {...object, employerName: parseToString(object.employerName), sickLeave: parseSickLeave(object.sickLeave)};
      }
      else if(object.type === EntryType.Hospital) {
        return { ...object, discharge: parseDischarge(object.discharge) };
       }  
      else {
        return object;
      }           
  }; 
  
//export default toNewPatientEntry;
