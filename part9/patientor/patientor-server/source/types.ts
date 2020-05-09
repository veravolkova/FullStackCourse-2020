//export type State = 'light' | 'moderate' | 'severe' ;

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
    gender: string;
    occupation: string;
  } 

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;