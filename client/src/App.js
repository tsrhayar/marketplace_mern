import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Components/Home";
import Login from "./Components/Login";
import Registre from "./Components/Registre";
import Admin from "./Components/Admin/Admin";
import NavBar from "./Components/NavBar";
import Todos from "./Components/Todos";

import SuperAdmin from "./Components/SuperAdmin/SuperAdmin";
import AddAdmin from "./Components/SuperAdmin/AddAdmin";
import GestionAdmin from "./Components/SuperAdmin/GestionAdmin";
import BlockAdmin from "./Components/SuperAdmin/BlockAdmin";
import ActiveAdmin from "./Components/SuperAdmin/ActiveAdmin";
import DeleteAdmin from "./Components/SuperAdmin/DeleteAdmin";

import Seller from "./Components/Seller/Seller";

import AddProduct from "./Components/Products/AddProduct";
import ProductPage from "./Components/Products/ProductPage";

import FilterByPriceLTH from "./Components/Filtre/FilterByPriceLTH";
import FilterByPriceHTL from "./Components/Filtre/FiltreByPriceHTL";

import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <div className="container">
          <Route exact path="/" component={Home} />
          <Route exact path="/productpage" component={ProductPage} />
          <Route exact path="/bypricelth" component={FilterByPriceLTH} />
          <Route exact path="/bypricehtl" component={FilterByPriceHTL} />
          <UnPrivateRoute exact path="/login" component={Login} />
          <UnPrivateRoute exact path="/registre" component={Registre} />
          <PrivateRoute path="/todos" roles={["superadmin", "admin", "seller"]} component={Todos} />
          <PrivateRoute path="/admin" roles={["superadmin", "admin"]} component={Admin} />
          <PrivateRoute path="/superadmin" roles={["superadmin"]} component={SuperAdmin} />
          <PrivateRoute path="/gestionadmin" roles={["superadmin"]} component={GestionAdmin} />
          <PrivateRoute path="/seller" roles={["superadmin", "seller"]} component={Seller} />
          <PrivateRoute path="/addadmin" roles={["superadmin"]} component={AddAdmin} />
          <PrivateRoute path="/blockadmin/:id" roles={["superadmin"]} component={BlockAdmin} />
          <PrivateRoute path="/activeadmin/:id" roles={["superadmin"]} component={ActiveAdmin} />
          <PrivateRoute path="/deleteadmin/:id" roles={["superadmin"]} component={DeleteAdmin} />
          <PrivateRoute
            path="/addproduct"
            roles={["superadmin", "admin", "seller"]}
            component={AddProduct}
          />
        </div>
      </Router>
    </div>
  );
}

export default App;
