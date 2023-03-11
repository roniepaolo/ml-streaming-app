const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const customerRoutes = require('./routes/customer.routes')
const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(customerRoutes)
app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})

app.listen(80)
