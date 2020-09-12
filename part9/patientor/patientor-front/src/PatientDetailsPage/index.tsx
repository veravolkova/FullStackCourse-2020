import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Container, Icon } from 'semantic-ui-react'

import { Patient } from '../types'
import { apiBaseUrl } from '../constants'

import { useStateValue } from '../state'
import { setPatient } from '../state/reducer'

//import AddEntryModal from '../AddEntryModal'
import EntryDetails from './EntryDetails'


const PatientDetailsPage: React.FC = () => {

  const [{ patients }, dispatch] = useStateValue()
  const [error, setError] = React.useState<string | undefined>()

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

  //to do
  const submitNewEntry = () => {
    console.log('submit new entry')
  }

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
          <EntryDetails entry={entry} />
        ))}
      </Container>

      {/*   to do: 
      <AddEntryForm    
        onSubmit={submitNewEntry}
        error={error}     
      /> */}
    </div>
  )
}

export default PatientDetailsPage
