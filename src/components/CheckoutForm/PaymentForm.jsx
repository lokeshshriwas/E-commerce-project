import { Button, CssBaseline, Divider, Typography } from "@mui/material";
import {
  CardElement,
  Elements,
  ElementsConsumer,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Review } from "./index";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ shippingData, checkoutToken, back, onCaptureCheckout, nextStep, timeout}) => {
  const handleSubmit = async ( event, elements, stripe ) => {
    event.preventDefault()
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastname,
          email: shippingData.email,
          phone: shippingData.phone,
        },
        shipping: {
          name: "Primary",
          street: shippingData.address,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          phone: shippingData.phone,
          country: shippingData.shippingCountry
        },
        fullfillment: {
          shipping_method: shippingData.shippingOption
        },
        payment: {
          gateway: "stripe",
          stripe:{
            payment_method_id : paymentMethod.id
          }

        }
      };
      onCaptureCheckout(checkoutToken.id, orderData)
      timeout()
      nextStep()
    }
  };

  return (
    <>
    <CssBaseline/>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(event) => handleSubmit(event, elements, stripe)}>
              <CardElement/>
              <br />
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={back}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  Pay {checkoutToken.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
