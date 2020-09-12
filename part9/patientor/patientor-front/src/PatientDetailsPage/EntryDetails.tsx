import React from 'react'
import { Entry, EntryType } from '../types'

import HealthCheckEntry from './HealthCheckEntry'
import OccupationalEntry from './OccupationalEntry'
import HospitalEntry from './HospitalEntry'

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  switch (entry.type) {
    case EntryType.HealthCheck:
      return <HealthCheckEntry entry={entry} />
    case EntryType.OccupationalHealth:
      return <OccupationalEntry entry={entry} />
    case EntryType.Hospital:
      return <HospitalEntry entry={entry} />
    default:
      return assertNever(entry)
  }
}
export default EntryDetails
