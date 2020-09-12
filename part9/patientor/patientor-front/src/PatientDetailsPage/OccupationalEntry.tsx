import React from 'react'

import { OccupationalHealthcareEntry as OccupationalEntr } from '../types'
import { Card, Icon } from 'semantic-ui-react'

import DiagnosisDescr from './DiagnosisDescr'

const OccupationalHealthCareEntry: React.FC<{ entry: OccupationalEntr }> = ({ entry }) => {
  return (
    <Card>
      <div>
        <Card.Content header={entry.date} />
        <Icon name='doctor' />
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
      <h5>{entry.employerName}</h5>
      <h5>{entry.sickLeave?.startDate}</h5>
      <h5>{entry.sickLeave?.endDate}</h5>
    </Card>
  )
}

export default OccupationalHealthCareEntry