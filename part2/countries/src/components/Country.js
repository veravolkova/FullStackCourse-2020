import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiKey } from "../constants.js";

const Country = props => {
  const [weather, setWeather] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${props.capital}&units=Metric&APIkey=${apiKey}`
      )
      .then(response => {
        //console.log("promise weather fulfilled");
        setWeather(response.data);
        setIsLoading(false);
      });
  }, [props.capital]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <h2> {props.name} </h2>
      <h6> capital {props.capital}</h6>
      <h6> population {props.population}</h6>
      <h3> Spoken Languages </h3>
      <ul>
        {props.languages.map((lang, k) => (
          <li key={k}> {lang.name} </li>
        ))}
      </ul>
      <img src={props.flag} alt="flag" width="200" height="100" />

      <h3> Weather in {props.capital}</h3>
      <h6> Temperature {weather.main.temp} C</h6>
      <h6> Description {weather.weather[0].description}</h6>
      <img
        src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
        alt="weather"
        width="200"
        height="100"
      />
    </>
  );
};

export default Country;
