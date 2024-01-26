import { useEffect, useState } from "react";
import "./App.css";
import { Products, Navbar, Cart, Checkout } from "./components";
import { commerce } from "./lib/commerce.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProduct(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddCart = (productId, quantity) => {
    commerce.cart
      .add(productId, quantity)
      .then((res) => setCart(res))
      .catch((err) => console.log(err.message));
  };

  const handleUpdateCartQty = (productId, quantity) => {
    commerce.cart
      .update(productId, { quantity })
      .then((res) => setCart(res))
      .catch((err) => console.log(err.message));
  };

  const handleRemoveFromCart = (productId) => {
    commerce.cart
      .remove(productId)
      .then((res) => setCart(res))
      .catch((err) => console.log(err.message));
  };

  const handleEmptyCart = () => {
    commerce.cart
      .empty()
      .then((res) => setCart(res))
      .catch((err) => console.log(err.message));
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMsg(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route
            path="/"
            element={<Products onAddToCart={handleAddCart} product={product} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                // error={errorMsg}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
