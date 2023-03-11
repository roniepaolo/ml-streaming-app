import React, {useEffect, useState} from 'react';
import {
  Button,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Box
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import './demo.css'

const Demo = () => {
  const [customers, setCustomers] = useState([])
  const [open, setOpen] = React.useState(false);
  const [itemCreditscore, setCreditscore] = useState(350)
  const [itemAge, setAge] = useState(18)
  const [itemTenure, setTenure] = useState(0)
  const [itemBalance, setBalance] = useState(0)
  const [itemNumofproducts, setNumofproducts] = useState(1)
  const [itemHascrcard, setHascrcard] = useState(0)
  const [itemIsactivemember, setIsactivemember] = useState(0)
  const [itemEstimatedsalary, setEstimatedsalary] = useState(0)
  const [itemGeography_germany, setGeography_germany] = useState(0)
  const [itemGeography_spain, setGeography_spain] = useState(0)
  const [itemGender_male, setGender_male] = useState(0)
  const [loading, setLoading] = useState(false)

  const loadCustomers = async () => {
    const response = await fetch('http://' + process.env.REACT_APP_BACK + '/customers')
    const data = await response.json()
    setCustomers(data)
  }
  useEffect(() => {
    loadCustomers()
  }, [])

  const columns = [
    { field: 'customerid', headerName: 'ID', type: 'number', width: 70 },
    { field: 'creditscore', headerName: 'CreditScore', type: 'number', width: 100 },
    { field: 'age', headerName: 'Age', type: 'number', width: 70 },
    { field: 'tenure', headerName: 'Tenure', type: 'number', width: 80 },
    { field: 'balance', headerName: 'Balance', type: 'number', width: 100 },
    { field: 'numofproducts', headerName: '# Products', type: 'number', width: 100 },
    { field: 'hascrcard', headerName: 'Credit Card', type: 'number', width: 100 },
    { field: 'isactivemember', headerName: 'Active Member', type: 'number', width: 120 },
    { field: 'estimatedsalary', headerName: 'Estimated Salary', type: 'number', width: 130 },
    { field: 'geography_germany', headerName: 'From Germany', type: 'number', width: 120 },
    { field: 'geography_spain', headerName: 'From Spain', type: 'number', width: 100 },
    { field: 'gender_male', headerName: 'Gender', type: 'number', width: 70 },
    { field: 'exited', headerName: 'Churn', type: 'number', width: 70 }
  ];
  const rows = customers;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  const onAddNewItem = async () => {
    const testCreditscore = itemCreditscore >= 350 && itemCreditscore <= 850
    const testAge = itemAge >= 18 && itemAge <= 100
    const testTenure = itemTenure >= 0 && itemTenure <= 10
    const testBalance = itemBalance >= 0 && itemBalance <= 300000
    const testNumofproducts = parseInt(itemNumofproducts) === 1 || parseInt(itemNumofproducts) === 2 ||
      parseInt(itemNumofproducts) === 3 || parseInt(itemNumofproducts) === 4
    const testHascrcard = parseInt(itemHascrcard) === 1 || parseInt(itemHascrcard) === 0
    const testIsactivemember = parseInt(itemIsactivemember) === 1 || parseInt(itemIsactivemember) === 0
    const testEstimatedsalary = itemEstimatedsalary >= 0 && itemEstimatedsalary <= 200000
    const testGeography_germany = parseInt(itemGeography_germany) === 1 || parseInt(itemGeography_germany) === 0
    const testGeography_spain = parseInt(itemGeography_spain) === 1 || parseInt(itemGeography_spain) === 0
    const testGender_male = parseInt(itemGender_male) === 1 || parseInt(itemGender_male) === 0
    const testBody = testCreditscore && testAge && testTenure && testBalance && testNumofproducts &&
      testHascrcard && testIsactivemember && testEstimatedsalary && testGeography_germany &&
      testGeography_spain && testGender_male
    if (!testBody) {
      return
    }

    setLoading(true)
    const post_body = {
      "creditscore": itemCreditscore,
      "age": itemAge,
      "tenure": itemTenure,
      "balance": itemBalance,
      "numofproducts": itemNumofproducts,
      "hascrcard": itemHascrcard,
      "isactivemember": itemIsactivemember,
      "estimatedsalary": itemEstimatedsalary,
      "geography_germany": itemGeography_germany,
      "geography_spain": itemGeography_spain,
      "gender_male": itemGender_male
    }
    await fetch('http://' + process.env.REACT_APP_BACK + '/customers', {
      method: 'POST',
      body: JSON.stringify(post_body),
      headers: {'Content-Type': 'application/json'}
    })
    await timeout(2000);
    loadCustomers()
    setLoading(false)
    setOpen(false);
  }

  return (
    <div id="demo">
      <div className="churn__cta">
        <div className="churn__cta-content">
          <h3>Try the demo: Request the churn status of a customer</h3>
          <p>
            A ML classification model was trained using a data set that contains the details of bank's customers <br/>
            Make a request with the customer information in order to know their churn status <br/>
            Remember that all the data you are sending is flowing through this streaming pipeline
          </p>
        </div>
        <div className="churn__cta-btn">
          <button type="button" onClick={handleClickOpen}>Make a request</button>
        </div>
      </div>
      <div className="churn__cta-demo">
        <Box sx={{height: 500, width: "100%"}}>
          <DataGrid
            disableColumnMenu
            disableSelectionOnClick
            showCellRightBorder
            getRowId={(row) => row.customerid}
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            initialState={{
              sorting: {
                sortModel: [{ field: 'customerid', sort: 'desc' }],
              },
            }}
          />
        </Box>
      </div>
      <div className="churn__cta-demo_dialog">
        <Dialog open={open} onClose={handleClose} disableTypography="true">
          <DialogTitle>Churn status request</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill the customer information and submit it in order to know their churn status
            </DialogContentText>
            <Grid container rowSpacing={0} columnSpacing={4}>
              <Grid item xs={5.8}>
                <TextField
                  type="number"
                  fullWidth
                  margin="dense"
                  id="creditscore"
                  label="Credit Score"
                  variant="standard"
                  helperText="Between 350 and 850"
                  value={itemCreditscore}
                  onChange={e => {
                    setCreditscore(e.target.value)
                  }}
                  error={itemCreditscore < 350 || itemCreditscore > 850}
                />
              </Grid>
              <Grid item xs={5.8}>
                <TextField
                  type="number"
                  fullWidth
                  margin="dense"
                  id="age"
                  label="Age"
                  variant="standard"
                  helperText="Between 18 and 100"
                  value={itemAge}
                  onChange={e => {
                    setAge(e.target.value)
                  }}
                  error={itemAge < 18 || itemAge > 100}
                />
              </Grid>
              <Grid item xs={5.8}>
                <TextField
                  type="number"
                  fullWidth
                  margin="dense"
                  id="tenure"
                  label="Tenure"
                  variant="standard"
                  helperText="Between 0 and 10"
                  value={itemTenure}
                  onChange={e => {
                    setTenure(e.target.value)
                  }}
                  error={itemTenure < 0 || itemTenure > 10}
                />
              </Grid>
              <Grid item xs={5.8}>
                <TextField
                  type="number"
                  fullWidth
                  margin="dense"
                  id="balance"
                  label="Balance"
                  variant="standard"
                  helperText="Between 0 and 300 000"
                  value={itemBalance}
                  onChange={e => {
                    setBalance(e.target.value)
                  }}
                  error={itemBalance < 0 || itemBalance > 300000}
                />
              </Grid>
              <Grid item xs={5.8}>
                <TextField
                  type="number"
                  fullWidth
                  margin="dense"
                  id="numofproducts"
                  label="Num. of Products"
                  variant="standard"
                  helperText="Between 1 and 4"
                  value={itemNumofproducts}
                  onChange={e => {
                    setNumofproducts(e.target.value)
                  }}
                  error={itemNumofproducts < 1 || itemNumofproducts > 4}
                />
              </Grid>
              <Grid item xs={5.8}>
                <TextField
                  type="number"
                  fullWidth
                  margin="dense"
                  id="hascrcard"
                  label="Has a Credit Card"
                  variant="standard"
                  helperText="Yes: 1, No: 0"
                  value={itemHascrcard}
                  onChange={e => {
                    setHascrcard(e.target.value)
                  }}
                  error={parseInt(itemHascrcard) !== 0 && parseInt(itemHascrcard) !== 1}
                />
              </Grid>
              <Grid item xs={5.8}>
                <TextField
                  type="number"
                  fullWidth
                  margin="dense"
                  id="isactivemember"
                  label="Is Active Member"
                  variant="standard"
                  helperText="Yes: 1, No: 0"
                  value={itemIsactivemember}
                  onChange={e => {
                    setIsactivemember(e.target.value)
                  }}
                  error={parseInt(itemIsactivemember) !== 0 && parseInt(itemIsactivemember) !== 1}
                />
              </Grid>
              <Grid item xs={5.8}>
                <TextField
                  type="number"
                  fullWidth
                  margin="dense"
                  id="estimatedsalary"
                  label="Estimated Salary"
                  variant="standard"
                  helperText="Between 0 and 200 000"
                  value={itemEstimatedsalary}
                  onChange={e => {
                    setEstimatedsalary(e.target.value)
                  }}
                  error={itemEstimatedsalary < 0 || itemEstimatedsalary > 200000}
                />
              </Grid>
              <Grid item xs={5.8}>
                <TextField
                  type="number"
                  fullWidth
                  margin="dense"
                  id="geography_germany"
                  label="Is from Germany"
                  variant="standard"
                  helperText="Yes: 1, No: 0"
                  value={itemGeography_germany}
                  onChange={e => {
                    setGeography_germany(e.target.value)
                  }}
                  error={parseInt(itemGeography_germany) !== 0 && parseInt(itemGeography_germany) !== 1}
                />
              </Grid>
              <Grid item xs={5.8}>
                <TextField
                  type="number"
                  fullWidth
                  margin="dense"
                  id="geography_spain"
                  label="Is from Spain"
                  variant="standard"
                  helperText="Yes: 1, No: 0"
                  value={itemGeography_spain}
                  onChange={e => {
                    setGeography_spain(e.target.value)
                  }}
                  error={parseInt(itemGeography_spain) !== 0 && parseInt(itemGeography_spain) !== 1}
                />
              </Grid>
              <Grid item xs={5.8}>
                <TextField
                  type="number"
                  fullWidth
                  margin="dense"
                  id="gender_male"
                  label="Gender"
                  variant="standard"
                  helperText="Male: 1, Female: 0"
                  value={itemGender_male}
                  onChange={e => {
                    setGender_male(e.target.value)
                  }}
                  error={parseInt(itemGender_male) !== 0 && parseInt(itemGender_male) !== 1}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={onAddNewItem} disabled={loading}>{loading ? <CircularProgress/> : 'Submit'}</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Demo;