export enum Gender {
  Male = 'male',
  Female = 'female', 
  Other = 'other'
}

export interface Diagnosis {     
  code: string 
  name: string
  latin?: string   
} 

export enum EntryType {
  HealthCheck = 'HealthCheck',
  OccupationalHealth = 'OccupationalHealthcare',
  Hospital = 'Hospital'
}

export interface BaseEntry {
  id: string  
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Array<Diagnosis['code']>
  type: EntryType
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck
  healthCheckRating: HealthCheckRating
}

export interface Discharge {
  date: string
  criteria: string
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital
  discharge: Discharge
}

export interface SickLeave {
  startDate: string
  endDate: string
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealth
  employerName: string
  sickLeave?: SickLeave
}

export type Entry = 
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry

export type NewBaseEntry = Omit<BaseEntry, 'id'>

type UnionOmit<T, K> = T extends {} ? Pick<T, Exclude<keyof T, K>> : never

export type NewEntry = UnionOmit<Entry, 'id'>

export interface Patient {
  id: string
  name: string
  ssn: string
  occupation: string
  gender: Gender
  dateOfBirth: string  
  entries: Entry[] 
}
  
export type PatientSensitive = Omit<Patient, 'id'>
export type PatientNonSensitive = Omit<Patient, 'ssn'>
export type NewPatientEntry = Omit<Patient, 'id' | 'entries'>


