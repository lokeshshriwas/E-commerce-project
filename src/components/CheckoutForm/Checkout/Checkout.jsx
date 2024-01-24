import {
  Button,
  CircularProgress,
  Divider,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import "./styles.css";
import React, { useState } from "react";
import { AddressForm, Confirmation, PaymentForm } from "../index";

const steps = ["Shipping Address", "Payment Details"];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);

  const Forms = () => (activeStep === 0 ? <AddressForm /> : <PaymentForm />);

  return (
    <>
      <div className="toolbar">
        <main className="layout">
          <Paper className="paper">
            <Typography variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className="stepper">
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? <Confirmation /> : <Forms />}
          </Paper>
        </main>
      </div>
    </>
  );
};

export default Checkout;
