import React, { useContext, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, IconButton } from "@material-ui/core";
import "./Login.css";
import { useHistory } from "react-router";
import { AuthContext } from "./Usercontext";
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';




const SignUp = () => {
  const [email, setEmail] = useState("");

  const { auth, userList, setAuthenticated } = useContext(AuthContext);
  const [open, setOpen] = useState(false)

  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleClose=()=>{
      setOpen(false)
  }


  const submitform = (e) => {
    e.preventDefault();
    console.log(setAuthenticated);

    const user = userList.find((e) => {
      return e.email === email && e.password === password;
    });
    if (user !== undefined) {
      setAuthenticated(user.name);
      history.push("/");
    } else {
        
      console.log("user not found");
      setOpen(true)
    }
  };

  return (
    <div className="basick">
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="User Not Found"
        action={
          <>
            
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
      <div className="loform">
        <h3 className="head" style={{ color: "white" }}>
          {" "}
          Login Page
        </h3>
        <form
          className="loorm"
          noValidate
          autoComplete="off"
          onSubmit={submitform}
        >
          <TextField
            id="email"
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            variant="outlined"
            required
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            variant="outlined"
            required
          />
          <div className="buttosk">
            <Button variant="contained" type="submit" color="secondary">
              Login
            </Button>
            <a style={{ color: "lightgrey" }} href="/signup">
              Click to register{" "}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

/*  const found = () =>{
           allEntry.find( (email,password) => {
               if(email==allEntry.email )
               {
                   alert("user found")
               }
               else{
                   alert("user not found")
               }
           }  )
       }
        
       found();
       */
