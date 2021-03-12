import React, { useContext, useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import axios from "axios";
import InputBase from "@material-ui/core/InputBase";
import "./Currency.css";
import Login from "./Login";
import { AuthContext } from "./Usercontext";
import { MenuItem, Paper, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const Currency = () => {
  const classes = useStyles();
  const [text1, setText1] = useState(1);
  const [text2, setText2] = useState(1);
  const [value1, setValue1] = useState(1);
  const [value2, setValue2] = useState(1);
  const [country1, setCountry1] = useState([]);
  const [country2, setCountry2] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(`https://api.exchangeratesapi.io/latest`);
      console.log(result.data);
      setCountry1(result.data.rates);
      setCountry2(result.data.rates);
    };
    console.log(auth);
    fetchItems();
  }, []);

  const convert = (e) => {
    e.preventDefault();
    const num = (value2 / value1) * text1;
    setText2(num);
  };

  const handleChange1 = (event) => {
    setValue1(event.target.value);
  };
  const handleChange2 = (event) => {
    setValue2(event.target.value);
  };

  return (
    <div>
      <div className="App">
        <header className="App-header">
         
          <Paper className="formone">
          <h2> Hello {auth.isAuthenticated ? auth.name : "guest"}</h2>
          <form onSubmit={convert} >
            <Grid container spacing={3}>
              <Grid item xs={7}>
              
                 
                  <TextField
                    value={text1 || " "}
                    variant="outlined"

                    onChange={(e) => {
                      setText1(e.target.value);
                    }}
                    id="demo-customized-textbox"
                    required
                    fullWidth
                    label="Currency"
                  />
               
              </Grid>
              <Grid item xs={5}>
                
                  <InputLabel id="demo-customized-select-label">
                    Country
                  </InputLabel>
                  <Select
                    className="slectclass"
                    value={value1}
                    onChange={handleChange1}
                    fullWidth
                  >
                    {Object.keys(country1).map((value1, index) => (
                      <MenuItem key={index} value={country1[value1]}>
                        {value1}
                      </MenuItem>
                    ))}
                  </Select>
               
              </Grid>
              <Grid item xs={7}>
                
                  
                  <TextField
                    value={text2 || ""}
                    variant="outlined"
                    id="demo-customized-textbox"
                    required
                    fullWidth
                    label="Currency"
                  />
              
              </Grid>
              <Grid item xs={5}>
               
                  <InputLabel id="demo-customized-select-label">
                    Country
                  </InputLabel>
                  <Select
                    className="slectclass"
                    value={value2}
                    onChange={handleChange2}
                    fullWidth
                  >
                    {Object.keys(country2).map((value2, index) => (
                      <MenuItem key={index} value={country2[value2]}>
                        {value2}
                      </MenuItem>
                    ))}
                  </Select>
               
              </Grid>
              <Grid item xs={12}>
               
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                   fullWidth
                    mx="auto"
                  >
                    Convert
                  </Button>
              
              </Grid>
            </Grid>
          </form>
          </Paper>
        </header>
      </div>
    </div>
  );
};

export default Currency;
