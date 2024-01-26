import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import CardItem from "./CartItem/CartItem";
import "./Cart.css";
import { Link } from "react-router-dom";

const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart,
      <Link to={"/"} className="link">
        {" "}
        start adding some!{" "}
      </Link>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <CardItem
              item={item}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className="cardDetails">
        <Typography variant="h5" >
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div sx={{width :{xs: "160px" , sm: "auto"}}}>
          <Button
            className="emptyButton"
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            sx={{
              marginRight: { sm: "10px", md: "20px" },
              marginBottom: { xs: "10px", sm: "0px" },
            }}
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            className="checkoutButton"
            size="large"
            type="button"
            variant="contained"
            color="primary"
            component={Link}
            to={"/checkout"}
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  if (!cart.line_items) return <div>loading...</div>;

  return (
    <Container>
      <div className="toolbar" />
      <Typography className="title" variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
