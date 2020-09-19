import React from 'react'
import { ErrorMessage, Field, FieldProps } from 'formik'
import { Form } from 'semantic-ui-react'
import { EntryType } from '../types'

export type EntryTypeOption = {
  value: EntryType
  label: string
}

type SelectEntryFieldProps = {
  label: string
  name: string
  options: string[]
}

export const SelectEntryField: React.FC<SelectEntryFieldProps> = ({
  label,
  name,
  options
}: SelectEntryFieldProps) => (
    <Form.Field>
      <label>{label}</label>
      <Field as='select' name={name} className='ui dropdown'>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Field>
    </Form.Field>
  )

interface EntryTextProps extends FieldProps {
  label: string
  placeholder: string
}

export const TextField: React.FC<EntryTextProps> = ({
  field,
  label,
  placeholder
}) => (
    <Form.Field>
      <label>{label}</label>
      <Field placeholder={placeholder} {...field} />
      <div style={{ color: 'red' }}>
        <ErrorMessage name={field.name} />
      </div>
    </Form.Field>
  )

