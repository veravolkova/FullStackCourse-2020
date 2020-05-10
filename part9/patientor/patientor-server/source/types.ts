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
  
export interface PatientEntry {
    id: number;
    ssn: string;
    name: string; 
    dateOfBirth: string;
    gender: Gender;
    occupation: string;
  } 

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;
export type NewPatientEntry = Omit<PatientEntry, 'id'>;