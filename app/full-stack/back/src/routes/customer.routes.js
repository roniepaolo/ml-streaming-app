const { Router } = require('express');
const { getAllCustomers, insertCustomer } = require('../controllers/customer.controllers')

const router = Router()

router.get('/customers', getAllCustomers)

router.post('/churn', insertCustomer)

module.exports = router;
