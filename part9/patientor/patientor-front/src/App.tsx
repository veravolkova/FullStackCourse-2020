import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientDetailsPage from "./PatientDetailsPage";

import { setPatientList} from "./state/reducer";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    // axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        // dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);

  return (
    <div>
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>          
            Home
          </Button>
      {/*     <Button as={Link} to="/patients/:id" primary>          
            Details
          </Button> */}
          <Divider hidden />
          <Switch>        
            <Route path="/" exact>
              <PatientListPage />
            </Route>
            <Route path="/patients/:id">
              <PatientDetailsPage />
            </Route>
         
 {/*         <Route path="/" render={() => <PatientListPage />} />             
            <Route path="/patients/:id"><PatientDetailsPage /></Route>   */}  
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
