import { Button, Typography } from "@mui/material";
import { collection, query, onSnapshot, limit } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { database } from "../../lib/firebase";
import { AuthContext } from "../../providers/AuthProvider";
import BusinessForm from "./BusinessForm";
import BusinessTable from "./BusinessTable";

const businessStyles = {
  margin: 20,
};

/**
 * The business component with the table to display the businesses
 * and the form to create new business but only if the user is
 * logged in
 * @author Diego Delgado
 * @returns Business component
 */
function Business() {
  const collectionRef = collection(database, 'business');
  const businessQuery = query(collectionRef, limit(1000));
  const [rowsData, setRowsData] = useState([]);
  const [show, setShow] = useState(false);
  const { user } = useContext(AuthContext);
  const isSignedIn = Object.entries(user).length > 0;

  useEffect(() => {
    getData();
  }, []);
  
  
  const handleShow = () => {
    setShow(!show);
  }

  const getData = () => {
    onSnapshot(businessQuery, (data) => {
      const result = data.docs.map(item => {
        const row = item.data();
        return {
          nit: row.nit,
          name: row.name,
          address: row.address,
          phone: row.phone
        };
      });

      setRowsData(result);
    });
  }

  return (
    <div style={businessStyles}>
      <Typography variant="h4">Business</Typography>
      <Button style={{ display: isSignedIn && !show ? 'block' : 'none' }} variant="outlined" onClick={handleShow}>Show form</Button>
      <BusinessForm showForm={show} setShowForm={setShow} />

      <div>
        <BusinessTable data={rowsData} />
      </div>
    </div>
  );
}

export default Business;