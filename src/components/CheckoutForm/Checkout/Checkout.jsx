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
import React, {useEffect, useState } from "react";
import { AddressForm, Confirmation, PaymentForm } from "../index";
import { commerce } from "../../../lib/commerce";

const steps = ["Shipping Address", "Payment Details"];

const Checkout = ({ cart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [formData, setFormData] = useState({})

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {
        console.log("Token genration error " + error)
      }
    };
    generateToken();
  }, []);

  const nextStep = ()=> setActiveStep((prev)=> (prev + 1))
  const back = ()=> setActiveStep((prev)=> (prev - 1))


  const next = (data)=>{
      setFormData(data)
      nextStep()

  }

  if(!checkoutToken) return <h1>loading...</h1>

  const Forms = () => (activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next} back={back}/> : <PaymentForm />);

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
            {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Forms />}
          </Paper>
        </main>
      </div>
    </>
  );
};

export default Checkout;
