import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebase";
import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

/**
 * Generates the layout components, with its buttons and
 * login validations
 * @author Diego Delgado
 * @returns Layout component
 */
function Layout() {
  const navigate = useNavigate();
  const { user, signout } = useContext(AuthContext);

  const isSignedIn = Object.entries(user).length > 0;

  const handleSignout = () => {
    signout(() => {
      auth.signOut();
      navigate('/', { replace: true });
    });
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Button style={{ color: 'white' }} variant="text" onClick={() => navigate('/business')}>
                  Business
                </Button>
                <Button hidden={!isSignedIn} style={{ color: 'white' }} variant="text" onClick={() => navigate('/inventory', { replace: true })}>
                  Inventory
                </Button>
            </Box>
            <Typography>
              Welcome, {isSignedIn ? 'user' : 'Guest'}!
            </Typography>
            <Button color="inherit" onClick={handleSignout}>{isSignedIn ? 'Logout' : 'Go back to login'}</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </div>
  );
}

export default Layout;