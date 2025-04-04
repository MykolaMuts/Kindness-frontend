import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Roles, SelectedPages} from "./App.constants.tsx";
import Tests1 from "./pages/Tests1.tsx";
import Login from "./pages/LoginPage.tsx";
import Registration from "./pages/RegistrationPage.tsx";
import ProtectedRoute from "./components/ProtectedRouter.tsx";
import EventPage from "./pages/EventPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import EventList from "./components/EventCard.tsx";
import UserPage from "./pages/UserPage.tsx";

const AppRoutes: React.FC = () => (

  <Routes>

    <Route element={<ProtectedRoute requiredRoles={[Roles.User]}/>}>
      <Route path={SelectedPages.User} element={<ProfilePage/>}/>
      <Route path={SelectedPages.Event} element={<EventPage/>}/>
    </Route>

    <Route element={<ProtectedRoute requiredRoles={[Roles.Admin]}/>}>
      <Route path={SelectedPages.Admin} element={<Tests1/>}/>
    </Route>

    <Route path="/" element={<Navigate to={SelectedPages.Home} replace/>}/>
    <Route path="/user/:userId" element={<UserPage/>}/>
    <Route path={SelectedPages.Home} element={<EventList/>}/>
    <Route path={SelectedPages.Login} element={<Login/>}/>
    <Route path={SelectedPages.Registration} element={<Registration/>}/>

  </Routes>

);


export default AppRoutes;