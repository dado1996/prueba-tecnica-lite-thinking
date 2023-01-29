import { Button, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { auth as authFirebase } from "../../lib/firebase";
import { AuthContext } from "../../providers/AuthProvider";

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #ccc',
  marginBottom: 5,
  padding: 5,
  alignItems: 'center',
};

const buttonsWrapperStyle = {
  display: "flex",
  flexDirection: "row",
  padding: 5,
  alignItems: "center"
};

function Login() {
  const { handleSubmit, control } = useForm();
  const { signin } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    try {
      const response = await authFirebase.signInWithEmailAndPassword(email, password);

      if (response.operationType === 'signIn') {
        signin({ user: response.user }, () => {
          navigate('/business', { replace: true });
        });
        return;
      }
      toast.error('Error al iniciar sesión');
    } catch (e) {
      toast.error(e.message);
    }
  }

  const handleGuest = () => {
    navigate('/business', { replace: true });
  }

  return (
    <div style={{ marginTop: 100, marginLeft: 100, width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
      <Typography variant="h3" alignItems="center">
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={wrapperStyle}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="email"
                type="email"
                label="Email"
              />
            )}
          />
        </div>

        <div style={wrapperStyle}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="password"
                type="password"
                label="Password"
              />
            )}
          />
        </div>

        <div style={buttonsWrapperStyle}>
          <Button variant="outlined" type="submit">Login</Button>
        </div>
      </form>
      <Button onClick={handleGuest}>Enter as guest</Button>
    </div>
  );
}

export default Login;