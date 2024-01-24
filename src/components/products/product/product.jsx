import React from 'react';
import { Card, CardContent, CardMedia, CardActions, Typography, IconButton } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import style from './styles.js';

const Product = ({ product, onAddToCart }) => {
  return (
    <Card style={style.root}>
      <CardMedia style={style.media} image={product.image.url} title={product.name} />
      <CardContent>
        <div style={style.cardContent}>
          <Typography gutterBottom variant="h6" component="h3">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2" fontWeight='bold'>
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
        <Typography variant='body2' color="textSecondary" dangerouslySetInnerHTML={{__html: product.description.slice(0, 100) + "<b>...more<b/>"} } />
      </CardContent>
      <CardActions disableSpacing style={style.cardActions}>
        <IconButton aria-label="Add to Cart" onClick={()=> onAddToCart(product.id, 1)}>
          <AddShoppingCart/>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
