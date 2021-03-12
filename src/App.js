import react, { useContext, useState } from 'react';
import {BrowserRouter as Switch, Redirect, Route} from "react-router-dom"
import Currency from "./Currency";
import SignUp from "./SignUp"
import Login from './Login'
import { AuthContext, AuthContextProvider} from './Usercontext'
import Navbar from "./Header"



function App() {
  const {auth } = useContext(AuthContext)

  console.log(auth)



 return (
    <div className="App">
     
       <Switch>
            <Navbar/>
         <Route exact path="/"><Currency /></Route>
          <Route exact path="/signup" render={()=> auth.isAuthenticated?<Redirect to="/" />:<SignUp />}/>          
          <Route exact path="/login" render={()=> auth.isAuthenticated?<Redirect to="/" />:<Login />}/>
         
       </Switch>
     
    </div>
  );
}

export default App;





