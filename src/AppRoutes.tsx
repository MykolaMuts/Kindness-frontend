import {Navigate, Route, Routes} from "react-router-dom";
import {Roles, SelectedPages} from "./App.constants.tsx";
import Tests1 from "./pages/Tests1.tsx";
import Login from "./pages/Login.tsx";
import Registration from "./pages/Registration.tsx";
import ProtectedRoute from "./components/ProtectedRouter/ProtectedRouter.tsx";
import React from "react";
import AddEventForm from "./pages/AddEventForm.tsx";

const AppRoutes: React.FC = () => (

  <Routes>
    <Route path="/" element={<Navigate to="/home" replace/>}/>
    <Route path={SelectedPages.Home} element={<Tests1/>}/>
    <Route path={SelectedPages.Login} element={<Login/>}/>
    <Route path={SelectedPages.Registration} element={<Registration/>}/>
    <Route element={<ProtectedRoute requiredRoles={[Roles.User]}/>}>
      <Route path={SelectedPages.Event} element={<AddEventForm/>}/>
    </Route>
    <Route element={<ProtectedRoute requiredRoles={[Roles.Admin]}/>}>
      <Route path={SelectedPages.Admin} element={<Tests1/>}/>
    </Route>
  </Routes>

);


export default AppRoutes;