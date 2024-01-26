import { Button, CircularProgress, Divider, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Checkout/styles.css";

let Confirmation = ({ order, error, isFinished }) => {
  console.log(order);
  order.customer ? (
    <>
      <div>
        <Typography variant="h5">
          Thank you for your purchase, {order.customer.firstname}{" "}
          {order.customer.lastname}
        </Typography>
        <Divider className="divider" />
        <Typography variant="subtitle2">
          Order ref: {order.customer_reference}
        </Typography>
      </div>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home
      </Button>
    </>
  ) : isFinished ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase</Typography>
        <Divider className="divider" />
        <br />
      </div>
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home
      </Button>
    </>
  ) : (
    <div className="spinner">
      <CircularProgress />
    </div>
  );

  if (error)
    return (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
      </>
    );
};

export default Confirmation;
