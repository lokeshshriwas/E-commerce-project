import { Grid } from "@mui/material";
import React from "react";
import {Product} from "../index"
import "./styles.css"

const Products = ({product, onAddToCart}) => {
  return (
    <main className="content">
      <div className="toolbar"/>
      <Grid container justify="center" spacing={4}>
        {product.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart}/>
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
