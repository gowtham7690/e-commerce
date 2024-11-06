const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
const port = process.env.PORT || 3000;
const adminProductRoutes = require('./routes/admin/product-routes')
const shopProductRoutes = require('./routes/shop/product-route')
mongoose.connect('mongodb://localhost:27017/ecommerce-shop')
.then(() => console.log('mongodb connected'))
.catch((err) => console.log(err));

// app.use(bodyParser.urlencoded())
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());

app.use('/api', authRouter);
app.use('/api/admin/product' , adminProductRoutes)
app.use('/api/shop/product' , shopProductRoutes)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`app listening on port ${port}!`)) 