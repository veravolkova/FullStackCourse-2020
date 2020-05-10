import { PatientEntry } from "../source/types";
import toNewPatientEntry from "../source/utils";

const data =
[
    {
        "id": 1,
        "ssn": "010189-230T",
        "name": "Martin Hobbs",
        "dateOfBirth": "1989-01-01",
        "gender": "male",
        "occupation": "construction worker"
    },
    {
        "id": 2,
        "ssn": "050694-230I",
        "name": "Ben Jerrys",
        "dateOfBirth": "1994-06-05",
        "gender": "male",
        "occupation": "student"       
    },
    {
        "id": 3,
        "ssn": "251287-211G",
        "name": "Lara Croft",
        "dateOfBirth": "1987-12-25",
        "gender": "female",
        "occupation": "Parturi Oy"     
    },
    {
        "id": 4,
        "ssn": "09012015-230T",
        "name": "Lisa Mills",
        "dateOfBirth": "2015-01-09",
        "gender": "female",
        "occupation": "New York City corp"       
    }
];

const patientEntries: PatientEntry [] = data.map(obj => {
    const object = toNewPatientEntry(obj) as PatientEntry;
    object.id = obj.id;
    return object;
  });

export default patientEntries;