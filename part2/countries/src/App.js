import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Country from "./components/Country";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  //fetching countries
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      //console.log("promise countries fulfilled");
      setCountries(response.data);
    });
  }, []);

  //filtering list of countries
  useEffect(() => {
    const results = countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [countries, searchTerm]);

  const handleSearchChange = async event => {
    setSearchTerm(event.target.value);
  };

  const setShowOnClick = country => {
    setSearchTerm(country.name);
  };

  //conditional rendering
  const countriesToShow =
    searchTerm.length > 0 && searchResults.length > 10 ? (
      <>Too many matches</>
    ) : searchTerm.length > 0 && searchResults.length === 1 ? (
      <Country
        name={searchResults[0].name}
        capital={searchResults[0].capital}
        population={searchResults[0].population}
        languages={searchResults[0].languages}
        flag={searchResults[0].flag}
      />
    ) : !searchTerm || !searchResults ? (
      <></>
    ) : (
      <><Countries countries={searchResults} onClick={setShowOnClick} /></>
    );

  return (
    <div>
      <Filter value={searchTerm} onChange={handleSearchChange} />
      <h2>Countries</h2>
      {countriesToShow}
    </div>
  );
};

export default App;
