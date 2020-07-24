import { useState } from "react"
import axios from "axios"

export const useField = (type) => {
    const [value, setValue] = useState("")

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange,
    }
}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    const getResources = () => {
        axios.get(baseUrl).then((response) => {
            setResources(response.data)
        })
    }

    const create = async (resource) => {
        const request = await axios.post(baseUrl, resource)
        console.log(request.data)
        setResources([...resources, request.data])
    }

    const service = {
        getResources,
        create,
    }

    return [resources, service]
}
