import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

import HealthRatingBar from '../components/HealthRatingBar'
import { HealthCheckEntry as HealthCheckEntr } from '../types'
import DiagnosisDescr from './DiagnosisDescr'


const HealthCheckEntry: React.FC<{ entry: HealthCheckEntr }> = ({ entry }) => {
  return (
    <Card>
      <div>
        <Card.Content header={entry.date} />
        <Icon name='lab' />
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
      <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
    </Card>
  )
}

export default HealthCheckEntry