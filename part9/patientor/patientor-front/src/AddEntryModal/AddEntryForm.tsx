import React from 'react'
import { useStateValue } from '../state'
import { Grid, Button } from 'semantic-ui-react'
import { Field, Formik, Form } from 'formik'
import * as Yup from 'yup'


import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField'
import { NewEntry, EntryType } from '../types'

import AddEntryDetails from './AddEntryDetails'
import HealthCheckEntry from '../PatientDetailsPage/HealthCheckEntry'

interface Props {
  initialValues: NewEntry
  onSubmit: (values: NewEntry) => void
  onCancel: () => void
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel, initialValues }) => {
  const [{ diagnoses }] = useStateValue()


  const minSchema = Yup.object().shape({
    description: Yup.string()
      .min(3, 'Too Short!')
      .max(250, 'Too Long!')
      .required('Required'),
    specialist: Yup.string()
      .min(2, 'Too Short!')
      .max(80, 'Too Long!')
      .required('Required'),
    date: Yup.date()
      .min(new Date('01-01-2019'))
      .max(new Date())
      .required('Required'),
    diagnosesCodes: Yup.array().of(Yup.string())
  })


  const occupationalSchema =
    Yup.object().shape({
      employerName: Yup.string()
        .min(2, 'Too Short!')
        .max(80, 'Too Long!')
        .required('Required'),
      sickLeave: Yup.object().shape({
        startDate: Yup.date()
          .min(new Date('01-01-2019'))
          .max(new Date()),
        endDate: Yup.date()
          .min(new Date('01-01-2019'))
          .max(new Date())
      })      
    })

  const healthCheckSchema =
    Yup.object().shape({
      healthCheckRating: Yup.number()
        .min(0)
        .max(3)
        .required('Required')
    })

  const hospitalSchema =
    Yup.object().shape({
      discharge: Yup.object().shape({
        date: Yup.date()
          .min(new Date('01-01-2019'))
          .max(new Date())
          .required('Required'),
        criteria: Yup.string()
          .min(3, 'Too Short!')
          .max(250, 'Too Long!')
          .required('Required'),
      }),
    })


  function merge(...schemas: any[]) {
    const [first, ...rest] = schemas

    const merged = rest.reduce(
      (mergedSchemas, schema) => mergedSchemas.concat(schema),
      first
    )

    return merged
  }


  const validationSchema = (): any => {
    switch (initialValues.type) {
      case EntryType.HealthCheck:
        return merge(minSchema, healthCheckSchema)
      case EntryType.OccupationalHealth:
        return merge(minSchema, occupationalSchema)
      case EntryType.Hospital:
        return merge(minSchema, hospitalSchema)
      default:
        return merge(minSchema, healthCheckSchema)
    }
  }


  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>
            <Field
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />

            <Field
              label='Date'
              placeholder='YYYY-MM-DD'
              name='date'
              component={TextField}
            />

            <Field
              label='Specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <AddEntryDetails entryType={values.type} />

            <Grid>
              <Grid.Column floated='left' width={5}>
                <Button type='button' onClick={onCancel} color='red'>
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Button
                  type='submit'
                  floated='right'
                  color='green'
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default AddEntryForm