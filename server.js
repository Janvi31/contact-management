const express = require('express');
const app = express();
const dotenv = require('dotenv');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./config/dbConnection');
dotenv.config();
const port = process.env.PORT || 3000;

connectDB();
app.use(express.json());

app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});