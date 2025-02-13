import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Roles, SelectedPages} from "./App.constants.tsx";
import Tests1 from "./pages/Tests1.tsx";
import Login from "./pages/LoginPage.tsx";
import Registration from "./pages/RegistrationPage.tsx";
import ProtectedRoute from "./components/ProtectedRouter/ProtectedRouter.tsx";
import AddEventPage from "./pages/AddEventPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

const AppRoutes: React.FC = () => (

  <Routes>

      <Route element={<ProtectedRoute requiredRoles={[Roles.User]}/>}>
          <Route path={SelectedPages.User} element={<ProfilePage/>}/>
          <Route path={SelectedPages.Event} element={<AddEventPage/>}/>
      </Route>

      <Route element={<ProtectedRoute requiredRoles={[Roles.Admin]}/>}>
          <Route path={SelectedPages.Admin} element={<Tests1/>}/>
      </Route>

      <Route path="/" element={<Navigate to="/home" replace/>}/>
      <Route path={SelectedPages.Home} element={<Tests1/>}/>
      <Route path={SelectedPages.Login} element={<Login/>}/>
      <Route path={SelectedPages.Registration} element={<Registration/>}/>

  </Routes>

);


export default AppRoutes;