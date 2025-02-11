const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models/index.js');
const authRoutes = require('./routes/auth.js');
// const productRoutes = require('./routes/products.js');
// const orderRoutes = require('./routes/orders.js');
// const userRoutes = require('./routes/users.js');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

// Sync database and start server
db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });