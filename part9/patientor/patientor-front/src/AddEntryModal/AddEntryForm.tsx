import React from 'react'
import { useStateValue } from '../state'
import { Grid, Button } from 'semantic-ui-react'
import { Field, Formik, Form } from 'formik'

import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField'
import { NewEntry } from '../types'

import AddEntryDetails from './AddEntryDetails'

interface Props {
  initialValues: NewEntry
  onSubmit: (values: NewEntry) => void
  onCancel: () => void  
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel, initialValues }) => {
  const [{ diagnoses }] = useStateValue()


  return (
    <Formik     
      initialValues={initialValues}
      onSubmit={onSubmit}      
      validate={values => {
        const requiredError = 'Field is required'
        const errors: { [field: string]: string } = {}
        if (!values.description) {
          errors.description = requiredError
        }
        if (!values.date) {
          errors.date = requiredError
        }
        if (!values.specialist) {
          errors.specialist = requiredError
        }       
        if (!values.diagnosisCodes) {
          errors.diagnosesCodes = requiredError
        }
        if (!values.type) {
          errors.type = requiredError
        }
        return errors
      }}
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