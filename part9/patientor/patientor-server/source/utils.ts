/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entry, Gender, NewPatientEntry } from './types'; 


//type guards
const isString = (text: any): text is string => {
    return typeof text === 'string';
  };

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

//fields check
const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn: ' + ssn);
    }
  
    return ssn;  
  };

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name: ' + name);
    }
  
    return name;  
  };  
  
const parseDate = (dateOfBirth: any): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date: ' + dateOfBirth);
    }

    return dateOfBirth;
  };

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    } 

    return gender;
  };

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation: ' + occupation);
    }  
    
    return occupation;  
  };

/* const parseEntries = (param: any): param is Entry => {
    return Object.values(Entry).includes(param);
  }; 
    
    return occupation;  
}; */

const toNewPatientEntry = (object: any): NewPatientEntry => {  
    return {
        ssn: parseSsn(object.ssn),
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        //to do
        entries: object.entries
    };
  };


export default toNewPatientEntry;