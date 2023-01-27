import { Button, TextField, Typography } from "@mui/material";
import { useContext } from "react";
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

  return (
    <div style={{ maxWidth: '50rem', display: 'flexbox', alignItems: 'center' }}>
      <Typography variant="h3" alignItems="center">
        Inicio de Sesión
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
                label="Correo electrónico"
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
                label="Contraseña"
              />
            )}
          />
        </div>

        <div style={buttonsWrapperStyle}>
          <Button variant="outlined" type="submit">Ingresar</Button>
        </div>
      </form>
    </div>
  );
}

export default Login;