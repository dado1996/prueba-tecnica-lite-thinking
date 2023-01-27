import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

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
  const {
    handleSubmit,
    control,
    formState: {
      errors
    }
  } = useForm({
    mode: 'onChange'
  });

  const onSubmit = ({ nit, name, address, phone }) => {
    try {

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
            numeric: 'Not a valid NIT',
            maxLength: {
              value: 8,
              message: 'Not a valid NIT'
            },
            minLength: {
              value: 8,
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

        <Controller
          name="name"
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

        <Controller
          name="address"
          control={control}
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

        <Controller
          name="phone"
          control={control}
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