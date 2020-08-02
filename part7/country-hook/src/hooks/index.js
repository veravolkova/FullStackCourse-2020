import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        try {
            if (name) {                
                axios
                    .get(`https://restcountries.eu/rest/v2/name/${name}`)
                    .then((response) => {
                        //console.log(response.data[0])                                             
                        setCountry(response.data[0])
                    })
            }
        } catch (e) {
            console.log("Error")
        }
    }, [name])

    return country
}


export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}