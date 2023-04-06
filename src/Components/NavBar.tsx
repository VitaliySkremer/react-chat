import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useContext, useState} from "react";
import {Context} from "../main";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import {useAuthState} from "react-firebase-hooks/auth";
import {useMediaQuery} from "@mui/material";

export const NavBar = () => {
  const {auth} = useContext(Context)
  const [user] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const login = async () =>{
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const {user} = await signInWithPopup(auth,provider);
  }


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () =>{
    auth.signOut();
    handleClose();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Общий чат
          </Typography>
          {user ? (
            <div>
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <Typography className="nav__name">
                  {user.displayName}
                </Typography>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Avatar alt="Remy Sharp" src={user.photoURL as string} />
                </IconButton>
              </div>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={logout}>Выйти</MenuItem>
              </Menu>
            </div>
          ):(
            <Button onClick={login} color="inherit">авторизоваться</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};