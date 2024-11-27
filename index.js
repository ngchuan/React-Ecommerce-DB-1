const express = require('express');
const cors = require('cors');
require('dotenv').config();

// make sure this comes AFTER dotenv config
const productsRouter = require('./routes/products');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');

const pool = require('./database');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', productsRouter);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

// Basic Route

// https://<server url>/
// https://<server url>/?success=true
// https://<server url>/?canceled=true

app.get('/', (req, res) => {
  let { success, canceled } = req.query;

  if (success == 'true') {
    res.json({ message: "Stripe transaction is successful!" });
  } else if (canceled == 'true') {
    res.json({ message: "Stripe transaction is canceled!" });
  } else {
    res.json({ message: "Welcome to the API" });
  }
  
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
