import React from "react";
import { Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

const FormInput = ({ label, name, required }) => {
  const { control } = useForm();
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label={label}
            required
          />
        )}
      />
    </Grid>
  );
};

export default FormInput;
