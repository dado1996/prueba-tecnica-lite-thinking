import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebase";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

function Layout() {
  const navigate = useNavigate();
  const { signout } = useContext(AuthContext);

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
          <Toolbar>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Button style={{ color: 'white' }} variant="text" onClick={() => navigate('/business')}>
                  Business
                </Button>
                <Button style={{ color: 'white' }} variant="text" onClick={() => navigate('/inventory', { replace: true })}>
                  Inventory
                </Button>
            </Box>
            <Button color="inherit" onClick={handleSignout}>Cerrar sesión</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </div>
  );
}

export default Layout;