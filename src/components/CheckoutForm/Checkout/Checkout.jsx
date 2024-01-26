import {
  Button,
  CircularProgress,
  Divider,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  CssBaseline,
} from "@mui/material";
import "./styles.css";
import React, { useEffect, useState } from "react";
import { AddressForm, Confirmation, PaymentForm } from "../index";
import { commerce } from "../../../lib/commerce";
import {useHistroy} from "react-router-dom"
  
const steps = ["Shipping Address", "Payment Details"];

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isFinished , setIsFinished] = useState(false)
  const history = useHistroy()

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {
        history.pushState("/")
      }
    };
    generateToken();
  }, []);

  const nextStep = () => setActiveStep((prev) => prev + 1);
  const back = () => setActiveStep((prev) => prev - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const timeout = () => {
    setTimeout(() => {
        setIsFinished(true)
    }, 3000);
  }

  if (!checkoutToken) return <h1>loading...</h1>;


  const Forms = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} back={back} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        back={back}
        onCaptureCheckout={onCaptureCheckout}
        nextStep={nextStep}
        timeout={timeout}
      />
    );

  return (
    <>
      <CssBaseline />
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
            {activeStep === steps.length ? (
              <Confirmation error={error} order={order} isFinished={isFinished}/>
            ) : (
              checkoutToken && <Forms />
            )}
          </Paper>
        </main>
      </div>
    </>
  );
};

export default Checkout;
