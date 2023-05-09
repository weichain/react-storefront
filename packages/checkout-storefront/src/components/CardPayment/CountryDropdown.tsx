/* eslint-disable import/no-restricted-paths */
import React from "react";

import { countries } from "./utils/countries";
import { GuestShippingAddressSection } from "@/checkout-storefront/sections/GuestShippingAddressSection";

interface ICountrySelectProps {
  country: string;
  setCountry: (value: string) => void;
}

export const CountryDropdown: React.FC<ICountrySelectProps> = ({ country, setCountry }) => {
  // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setCountry(event.target.value);
  // };
  return null;
  // Here is where I'm trying to reuse the component to use the country
  //return <GuestShippingAddressSection content="payment" />;
  // <div>
  //   <label
  //     className="text-[#4C4C4C] text-[12px] font-bold uppercase tracking-[.20em]"
  //     id="countries"
  //   >
  //     Country
  //   </label>
  //   <select
  //     id="countries"
  //     onChange={handleChange}
  //     value={country}
  //     className="w-full mb-4 pb-4 pt-3 px-4 border border-[#CBCBCB] text-[#475266] outline-none"
  //   >
  //     {countries.map((country) => (
  //       <option key={country} value={country}>
  //         {country}
  //       </option>
  //     ))}
  //   </select>
  // </div>
};
