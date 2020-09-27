import React from 'react'
import { EntryType } from '../types'
import { Formik, Field, FormikErrors } from 'formik'
import { TextField, NumberField } from '../AddPatientModal/FormField'

const AddEntryDetails: React.FC<{ entryType: EntryType }> = ({ entryType }) => { 


  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  switch (entryType) {
    case EntryType.HealthCheck:     
      return (
        <Field
          label='HealthCheckRating'
          name='healthCheckRating'
          component={NumberField}
          min={0}
          max={3}
        />        
      )      
    case EntryType.OccupationalHealth:
      return (
        <>
          <Field
            label='EmployerName'
            placeholder='Employer Name'
            name='employerName'
            component={TextField}
          />          
          <h4>Sick leave dates:</h4>
          <Field
            label='StartDate'
            placeholder='YYYY-MM-DD'
            name='sickLeave.startDate'
            component={TextField}
          />
          <Field
            label='EndDate'
            placeholder='YYYY-MM--DD'
            name='sickLeave.endDate'
            component={TextField}
          />
        </>
      )
    case EntryType.Hospital:
      return (
        <>
          <h5>Discharge:</h5>
          <Field
            label='Date'
            placeholder='YYYY-MM-DD'
            name='discharge.date'
            component={TextField}
          />
          <Field
            label='Criteria'
            placeholder='Criteria'
            name='discharge.criteria'
            component={TextField}
          />
        </>
      )
    default:
      return assertNever(entryType)
  }
}

export default AddEntryDetails
