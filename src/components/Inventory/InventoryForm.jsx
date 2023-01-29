import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { addDoc, collection, limit, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { database } from "../../lib/firebase";

const formStyles = {
  margin: 20,
  maxWidth: '50rem',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
};

const fieldStyles = {
  marginBottom: 5,
};

const errorsStyles = {
  color: 'red'
};

function InventoryForm({ showForm, setShowForm }) {
  const [businessList, setBusinessList] = useState([]);
  const businessQuery = query(collection(database, 'business'), limit(1000));
  const {
    handleSubmit,
    control,
    formState: {
      errors,
    },
  } = useForm();

  async function getBusiness() {
    onSnapshot(businessQuery, (data) => {
      const result = data.docs.map(item => {
        return {
          id: item.id,
          name: item.data().name,
        }
      });

      setBusinessList(result);
    });
  }

  useEffect(() => {
    if (!businessList.length) {
      getBusiness();
    }
  }, [businessList])

  const onSubmit = async ({ name, amount, unit, business_ref }) => {
    try {
      const businessRefTmp = collection(database, `business/${business_ref}/inventory/`);
      await addDoc(businessRefTmp, { name, amount, unit });
      toast.success('Data added successfully');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setShowForm(false);
    }
  }

  return (
    <div hidden={!showForm}>
      <h2>Register business</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyles}>
        <Controller
          name="name"
          rules={{
            required: 'Name is required',
          }}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="name"
              label="Name"
              variant="outlined"
              style={fieldStyles}
            />
          )}
        />
        {
          errors.name && <p style={errorsStyles}>{errors.name.message}</p>
        }

        <Controller
          name="amount"
          control={control}
          rules={{
            required: 'Amount is required',
            pattern: {
              value: /[0-9]+/,
              message: 'Invalid amount',
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              id="amount"
              label="Amount"
              variant="outlined"
              style={fieldStyles}
            />
          )}
        />
        {
          errors.amount && <p style={errorsStyles}>{errors.amount.message}</p>
        }

        <Controller
          name="unit"
          control={control}
          rules={{
            required: 'Address is required',
          }}
          render={({ field }) => (
            <TextField
              {...field}
              id="unit"
              label="Unit"
              variant="outlined"
              style={fieldStyles}
            />
          )}
        />
        {
          errors.unit && <p style={errorsStyles}>{errors.unit.message}</p>
        }

        <Controller
          name="business_ref"
          control={control}
          rules={{
            required: 'A business is required',
          }}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="business_ref_label">Business</InputLabel>
              <Select
                {...field}
                id="business_ref"
                label="Business"
              >
                <MenuItem value="">Select one...</MenuItem>
                {
                  businessList.map((b, i) => (
                    <MenuItem key={i} value={b.id}>{b.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          )}
        />
        {
          errors.business_ref && <p style={errorsStyles}>{errors.business_ref.message}</p>
        }
        
        <Button variant="contained" type="submit">Register</Button>
      </form>
    </div>
  );
}

export default InventoryForm;