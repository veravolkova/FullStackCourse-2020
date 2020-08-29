export enum Gender {
  Male = 'male',
  Female = 'female', 
}

export interface DiagnoseEntry {
    id: number;
    date: string; 
    name_eng: string;
    name_lat?: string;
    description: string;
  } 

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}
  
/* export interface PatientEntry {
    id: number;
    ssn: string;
    name: string; 
    dateOfBirth: string;
    gender: Gender;
    occupation: string;    
  }  */

//export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;
export type PatientSensitive = Omit<Patient, 'id'>;
export type PatientNonSensitive = Omit<Patient, 'ssn' | 'entries' >
export type NewPatientEntry = Omit<Patient, 'id'>;



