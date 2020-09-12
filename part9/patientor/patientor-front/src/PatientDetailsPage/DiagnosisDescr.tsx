import React from 'react'
import { useStateValue } from '../state'

import { Diagnosis } from '../types'

interface DiagnosisDescrProps {
  diagnosisCodes: Array<Diagnosis['code']>
}
const DiagnosisDescr: React.FC<DiagnosisDescrProps> = ({ diagnosisCodes }) => {
  const [{ diagnoses }] = useStateValue()
  console.log(diagnoses)

  return (
    <div>
      <ul>
        {diagnosisCodes.length > 1 && (
          diagnosisCodes.map((code, index) => (
            <li key={index}> {code} {diagnoses[code].name}</li>))
        )
        }
      </ul>
    </div>
  )
}

export default DiagnosisDescr