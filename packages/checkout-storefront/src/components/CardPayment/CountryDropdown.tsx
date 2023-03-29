/* eslint-disable import/no-restricted-paths */
import React from "react";

import { countries } from "./utils/countries";

interface ICountrySelectProps {
  country: string;
  setCountry: (value: string) => void;
}

export const CountryDropdown: React.FC<ICountrySelectProps> = ({ country, setCountry }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };

  return (
    <div>
      <label id="countries">Country</label>
      <select
        id="countries"
        onChange={handleChange}
        value={country}
        style={{
          width: "100%",
          height: "40px",
          margin: "0 auto 16px",
          paddingLeft: "16px",
          border: "1px solid rgb(143 143 143)",
          color: "#475266",
          outline: "none",
        }}
      >
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};
