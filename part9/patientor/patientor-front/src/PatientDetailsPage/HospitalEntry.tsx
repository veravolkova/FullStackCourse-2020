import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

import { HospitalEntry as HospitalEntr } from '../types'
import DiagnosisDescr from './DiagnosisDescr'


const HospitalEntry: React.FC<{ entry: HospitalEntr }> = ({ entry }) => {
  return (
    <Card>
      <div>
        <Card.Content header={entry.date} />
        <Icon name='hospital outline' />
      </div>
      <Card.Content description={entry.description} />
      <h5>{entry.specialist}</h5>
      {entry.diagnosisCodes && (
        <div>
          <h4>Diagnosis:</h4>
          <DiagnosisDescr diagnosisCodes={entry.diagnosisCodes} />
        </div>
      )
      }
      <h5>{entry.discharge.date}</h5>
      <h5>{entry.discharge.criteria}</h5>
    </Card>
  )
}

export default HospitalEntry