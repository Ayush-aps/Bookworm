// app.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const app = express();

// Import Routes
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const orderRoutes = require('./routes/orderRoutes');
const pageRoutes = require('./routes/pageRoutes'); // new routes for additional pages

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://book:Ausingh%402005@cluster0.i8o9d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session middleware
app.use(session({
  secret: 'bookwormSecret',
  resave: false,
  saveUninitialized: false,
}));

// Middleware to expose session user to all views
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Standard middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Routes
app.use('/', userRoutes);
app.use('/books', bookRoutes);
app.use('/orders', orderRoutes);
app.use('/', pageRoutes); // Handles routes like /userpage, /sell, etc.

// Default route: Homepage
app.get('/', (req, res) => {
  res.render('homepage');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
