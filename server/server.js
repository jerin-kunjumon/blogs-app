require('dotenv').config();

const express = require('express');
const cors = require('cors');


const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());



app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);


app.use(errorHandler)

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})
