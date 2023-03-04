const pool = require("../db");

const getAllCustomers = async (req, res, next) => {
    try {
        const result = await pool.query('select c.*, p.exited ' +
            'from ods.churn c ' +
            'inner join ods.churn_predictions p on c.customerid = p.customerid;');
        res.json(result.rows)
    }
    catch (e) {
        next(e)
    }
}

const insertCustomer = async (req, res, next) => {
    const {
        creditscore,
        age,
        tenure,
        balance,
        numofproducts,
        hascrcard,
        isactivemember,
        estimatedsalary,
        geography_germany,
        geography_spain,
        gender_male
    } = req.body

    try {
        const result = await pool.query(
            'insert into ods.churn ' +
            '(creditscore, age, tenure, balance, numofproducts, hascrcard, isactivemember, ' +
            'estimatedsalary, geography_germany, geography_spain, gender_male) values ' +
            '($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [
                creditscore,
                age,
                tenure,
                balance,
                numofproducts,
                hascrcard,
                isactivemember,
                estimatedsalary,
                geography_germany,
                geography_spain,
                gender_male
            ]
        )
        res.json(result.rows)
    } catch (e) {
        next(e)
    }
}

module.exports = {
    getAllCustomers,
    insertCustomer
}