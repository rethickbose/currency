import React, { useEffect, useState, useContext, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import "./SignUp.css";
import { useHistory } from "react-router";
import { AuthContext } from "./Usercontext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [allEntry, setAllEntry] = useState([]);
  const [pallEntry, setpAllEntry] = useState([]);
  const [loggedin, setloggedin] = useState(false);
 const { createUser } = useContext(AuthContext)
  
  const history = useHistory();

  const submitform = (e) => {
    e.preventDefault();
    
    createUser(name,email,password)
    history.push("/")
    // setEmail("");
    // setName("");
    //setPassword("");
    // history.push("/")
  };

  /*
  useEffect(() => {
    setpAllEntry(JSON.parse(localStorage.getItem("allEntry")));
  }, []);

  useEffect(() => {
    localStorage.setItem("allEntry", JSON.stringify(pallEntry));
  }, [pallEntry]);
*/


  return (
    <div className="basick">
      <div className="loginform">
        <h3 className="head" style={{ color: "white" }}>
          {" "}
          Sign up Page
        </h3>
        <form
          className="logform"
          noValidate
          autoComplete="off"
          onSubmit={submitform}
        >
          <TextField
            id="name"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            variant="outlined"
            required
          />
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
          <div className="buttonsk">
            <Button variant="contained" type="submit" color="secondary">
              Sign Up
            </Button>
            <a style={{ color: "lightgrey" }} href="/Login">
              Already registered{" "}
            </a>
          </div>
        </form>
        <div>
          {" "}
          {allEntry.map((ele) => {
            return <div>{ele.email}</div>;
          })}{" "}
        </div>
        
      </div>
    </div>
  );
};

export default SignUp;
