import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import {AuthContext} from "./Usercontext";
import GraphicEqIcon from '@material-ui/icons/GraphicEq';import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const { auth, setLoggedOut } = useContext(AuthContext);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <Avatar className={classes.avatar}>
                <GraphicEqIcon />
              </Avatar>
          <Typography variant="h6" className={classes.title}>
            Currency Converter
          </Typography>
          {auth.isAuthenticated ? (
            <Button onClick={setLoggedOut} color="inherit">Logout</Button>
          ) : (
            <>
              <Button color="inherit">
                <NavLink to="/signup" className="linknavbar">
                  Sign Up
                </NavLink>
              </Button>
              <Button color="inherit">
                <NavLink to="/login" className="linknavbar">
                  Login{" "}
                </NavLink>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
