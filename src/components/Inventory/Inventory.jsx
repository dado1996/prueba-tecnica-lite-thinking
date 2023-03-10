import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { collection, limit, onSnapshot, query } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { database } from '../../lib/firebase';
import { AuthContext } from "../../providers/AuthProvider";
import InventoryForm from "./InventoryForm";
import InventoryTable from "./InventoryTable";

const inventoryStyles = {
  margin: 20,
};

/**
 * Inventory page with the data and form to create new products
 * @author Diego Delgado
 * @return The inventory component
 */
function Inventory() {
  const [businessList, setBusinessList] = useState([]);
  const [currentBusiness, setCurrentBusiness] = useState('*');
  // const [currentBusinessName, setCurrentBusinessName] = useState('');
  const businessRef = collection(database, 'business');
  const businessQuery = query(businessRef, limit(1000));
  const [rowsData, setRowsData] = useState([]);
  const { user } = useContext(AuthContext);
  const isSignedIn = Object.entries(user).length > 0;

  useEffect(() => {
    if (businessList.length === 0) {
      getBusiness();
    }

    if (currentBusiness !== '*') {
      getInventories();
    }
    
  }, [currentBusiness]);
  
  const [show, setShow] = useState(false);
  
  const handleShow = () => {
    setShow(!show);
  }

  const getBusiness = () => {
    onSnapshot(businessQuery, (data) => {
      const result = data.docs.map(item => {
        return {
          id: item.id,
          name: item.data().name,
        };
      });
      setBusinessList(result);
    });
  };

  const getInventories = () => {
    const inventoryRef = collection(database, `business/${currentBusiness}/inventory/`);
    const inventoryQuery = query(inventoryRef, limit(1000));
    onSnapshot(inventoryQuery, (data) => {
      const result = data.docs.map(item => {
        return {
          name: item.data().name,
          amount: item.data().amount,
          unit: item.data().unit,
        }
      });

      setRowsData(result);
    });
  };

  const handleChangeBusinessFilter = (event) => {
    setCurrentBusiness(event.target.value);
  }

  return (
    <div style={inventoryStyles}>
      <Typography variant="h4">Inventories</Typography>
      <Button style={{ display: isSignedIn && !show ? 'block' : 'none' }} variant="outlined" onClick={handleShow}>Show form</Button>
      <InventoryForm showForm={show} setShowForm={setShow} />

      <Box style={{ marginTop: 10 }}>
        <FormControl fullWidth>
          <InputLabel id="business_filter_label">Business</InputLabel>
          <Select
            value={currentBusiness}
            id="business_filter"
            labelId="business_filter_label"
            label="Business"
            onChange={handleChangeBusinessFilter}
          >
            <MenuItem value="*">Select one...</MenuItem>
            {
              businessList.map((b, i) => (
                <MenuItem key={i} value={b.id}>{b.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Box>

      <div>
        <InventoryTable data={rowsData} />
      </div>
      <Grid container>
        <Grid item xs={6}>
          <Button variant="outlined">Send Email</Button>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={() => console.log('Here goes my pdf')} variant="outlined">Download PDF</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Inventory;