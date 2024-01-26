import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import FormInput from "./FormInput";
import { commerce } from "../../lib/commerce";
import { Link } from "react-router-dom";

const AddressForm = ({ checkoutToken, next, back}) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const method = useForm();

  const countries = Object.entries(shippingCountries).map(([code, value]) => ({
    id: code,
    label: value,
  }));
  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, value]) => ({
      id: code,
      label: value,
    })
  );
  const options = shippingOptions.map((sO)=> ({id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}))



  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[1]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[1]);
  };

  const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region,})
    setShippingOptions(options)
    setShippingOption(options[0].id)
  };


  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit((data)=> next({...data, shippingCountry, shippingSubdivision, shippingOption }) )}>
          <Grid container spacing={3}>
            <FormInput label={"First name"} name={"firstName"} />
            <FormInput label={"Last name"} name={"lastName"} />
            <FormInput label={"Address"} name={"address"} />
            <FormInput label={"Phone No."} name={"phone"} type="number"/>
            <FormInput label={"City"} name={"city"} />
            <FormInput label={"Email"} name={"email"} type={"email"}/>
            <FormInput label={"ZIP/ Postal code"} name={"zip"} type={"number"}/>

            <Grid item xs={12} sm={6}>
              {/* <InputLabel>Shipping Country</InputLabel> */}
              <Select
                fullWidth
                value={shippingCountry}
                onChange={(e) => setShippingCountry(e.target.value)}
                required
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                fullWidth
                value={shippingSubdivision}
                onChange={(e) => setShippingSubdivision(e.target.value)}
                required
              >
                {subdivisions.map((division) => (
                  <MenuItem key={division.id} value={division.id}>
                    {division.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e)=> setShippingOption(e.target.value)} required> 
              {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{display: "flex", justifyContent:"space-between"}}>
              <Button component={Link} to="/cart" variant="outlined" onClick={back}>Back to Cart</Button>
              <Button type="submit" color="primary" variant="contained">Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
