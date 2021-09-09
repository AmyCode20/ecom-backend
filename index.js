const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const productsRouter = require('./routers/products');
const categoriesRouter = require('./routers/categories')
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.options('*', cors())

const api = process.env.API_URL;

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(()=> {
    console.log('connection is successfull...')
})
.catch((err)=> {
    console.log('connection failed');
})

app.listen(3000, ()=> {
    console.log('server is runing http://localhost:3000')
})
