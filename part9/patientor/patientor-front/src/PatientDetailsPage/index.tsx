import React, { useState } from 'react'
import { useParams } from 'react-router-dom'  
import axios from 'axios'
import { Button, Container, Icon } from 'semantic-ui-react'

import { EntryType, NewEntry, Patient } from '../types'
import { apiBaseUrl } from '../constants'

import { useStateValue } from '../state'
import { setPatient } from '../state/reducer'

import AddEntryModal from '../AddEntryModal'
import EntryDetails from './EntryDetails'
import ChooseEntryType, { EntryTypeValues } from '../AddEntryModal/ChooseEntryType'


const PatientDetailsPage: React.FC = () => {

  const [{ patients }, dispatch] = useStateValue()
  const [error, setError] = React.useState<string | undefined>()
  const [modalOpen, setModalOpen] = React.useState<boolean>(false)
  const [entryType, setEntryType] = useState<string>('')
  const [visible, setVisible] = React.useState<boolean>(false)


  const openModal = (): void => setModalOpen(true)

  const closeModal = (): void => {
    setModalOpen(false)
    setError(undefined)
    setVisible(false)
  }

  const initialValuesNoType = {
    description: '',
    date: '',
    specialist: ''
  }

  const healthCheckInitialValues: NewEntry = {
    ...initialValuesNoType,
    type: EntryType.HealthCheck,
    healthCheckRating: 0,
  }

  const occupationalHealthCareIntitialValues: NewEntry = {
    ...initialValuesNoType,
    type: EntryType.OccupationalHealth,
    employerName: '',
    sickLeave: { startDate: '', endDate: '' },
  }

  const hospitalIntitialValues: NewEntry = {
    ...initialValuesNoType,
    type: EntryType.Hospital,
    discharge: { date: '', criteria: '' },
  }

  const initialValues = (entryType: string): NewEntry => {
    switch (entryType) {
      case 'healthcheck':
        return healthCheckInitialValues
      case 'occupational':
        return occupationalHealthCareIntitialValues
      case 'hospital':
        return hospitalIntitialValues
      default:
        return healthCheckInitialValues
    }
  }

  const handleSubmit = (values: EntryTypeValues) => {
    try {
      setEntryType(values.type)
      setVisible(true)

    } catch (e) {
      console.error(e.response.data)
      setError(e.response.data.error)
    }
  }

  const submitNewEntry = async (values: NewEntry) => {    
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      )
      dispatch(setPatient(updatedPatient))
      closeModal()
      setVisible(false)
    } catch (e) {
      console.error(e.response.data)
      setError(e.response.data.error)
    }
  }

  const { id } = useParams<{ id: string }>()
  let patient = patients[id]

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        )
        dispatch(setPatient(patientFromApi))
      } catch (e) {
        console.error(e)
      }
    }
    fetchPatient()
  }, [id, dispatch])

  const icon = () => {
    switch (patient.gender) {
      case 'female':
        return <Icon name='woman' />
      case 'male':
        return <Icon name='man' />
      default:
        return <Icon name='genderless' />
    }
  }

  if (!patient) {
    return null
  }

  return (
    <div >
      <Container textAlign='center'>
        <h3>Personal details {icon()}</h3>
        <h4>{patient.name}</h4>
        <h5>{patient.ssn} </h5>
        <h5>{patient.occupation}</h5>
        {patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
        {!visible ?
          (
            <ChooseEntryType onSubmit={handleSubmit} />
          ) : null
        }

        {visible ?
          (
            <>
              <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
                initialValues={initialValues(entryType)}
              />
              <Button onClick={() => openModal()}>Add New Entry</Button>
            </>
          ) : null
        }

      </Container>
    </div>
  )
}

export default PatientDetailsPage
