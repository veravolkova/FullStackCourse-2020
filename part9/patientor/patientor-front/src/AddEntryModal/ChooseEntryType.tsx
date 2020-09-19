import React from 'react'
import { Button } from 'semantic-ui-react'
import { Formik, Form } from 'formik'

import { SelectEntryField } from './EntryFormField'

export type EntryTypeValues = { type: string }
interface Props { onSubmit: (values: EntryTypeValues) => void }

const options: string[] = ['healtcare', 'hospital', 'occupational']


const ChooseEntryType: React.FC<Props> = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={{ type: '' }}
            onSubmit={onSubmit}
        >
            {() => {
                return (
                    <Form className='form ui'>
                        <SelectEntryField
                            options={options}
                            name='type'
                            label='Type of Entry to Add'
                        />
                        <Button type="submit">Proceed</Button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default ChooseEntryType