import React from 'react';
import { Button, TextField } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
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

function BusinessForm({ showForm, setShowForm }) {
  const collectionRef = collection(database, 'business');
  const {
    handleSubmit,
    control,
    formState: {
      errors
    }
  } = useForm();

  const onSubmit = async ({ nit, name, address, phone }) => {
    try {
      await addDoc(collectionRef, { nit, name, address, phone });
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
          name="nit"
          rules={{
            required: 'NIT is required',
            pattern: {
              value: /[0-9]{8}/,
              message: 'Not a valid NIT'
            },
          }}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="nit"
              label="NIT"
              variant="outlined"
              style={fieldStyles}
            />
          )}
        />
        {
          errors.nit && <p style={errorsStyles}>{errors.nit.message}</p>
        }

        <Controller
          name="name"
          control={control}
          rules={{
            required: 'Name is required',
          }}
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
          name="address"
          control={control}
          rules={{
            required: 'Address is required',
          }}
          render={({ field }) => (
            <TextField
              {...field}
              id="address"
              label="Address"
              variant="outlined"
              style={fieldStyles}
            />
          )}
        />
        {
          errors.address && <p style={errorsStyles}>{errors.address.message}</p>
        }

        <Controller
          name="phone"
          control={control}
          rules={{
            required: 'Phone is required',
            pattern: {
              value: /3[0-9]{9}/,
              message: 'Not a valid phone'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              id="phone"
              label="Phone"
              variant="outlined"
              style={fieldStyles}
            />
          )}
        />
        {
          errors.phone && <p style={errorsStyles}>{errors.phone.message}</p>
        }
        
        <Button variant="contained" type="submit">Register</Button>
      </form>
    </div>
  );
}

export default BusinessForm;