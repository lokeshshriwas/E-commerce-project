import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import FormInput from './FormInput'

const AddressForm = () => {
  const method = useForm();
  return (
    <>
      <Typography variant='h6' gutterBottom>Shipping Address</Typography>
      <FormProvider {...method}>
        <form onSubmit=''>
          <Grid container spacing={3}>
            < FormInput label={"First name"} name={"firstName"} required/>
            < FormInput label={"Last name"} name={"lastName"} required/>
            < FormInput label={"Address"} name={"address"} required/>
            < FormInput label={"City"} name={"city"} required/>
            < FormInput label={"Email"} name={"email"} required/>
            < FormInput label={"ZIP/ Postal code"} name={"zip"} required/>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                  Select me
                </MenuItem>
              </select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                  Select me
                </MenuItem>
              </select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                  Select me
                </MenuItem>
              </select>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm