const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const ordersRoutes = require('./routes/orders');
const customersRoutes = require('./routes/customers');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://db_user_read:LdmrVA5EDEv4z3Wr@cluster0.n10ox.mongodb.net/RQ_Analytics?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

// Define API routes here...
// Use routes
app.use('/api/orders', ordersRoutes);
app.use('/api/customers', customersRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
