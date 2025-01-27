import {Route, Routes} from "react-router-dom";
import {SelectedPages} from "./shared/App.constants.tsx";
import Tests1 from "./components/Tests1.tsx";
import Login from "./components/Login/Login.tsx";
import Registration from "./components/Registration/Registration.tsx";
import ProtectedRoute from "./components/ProtectedRouter.tsx";
import React from "react";

const AppRoutes: React.FC = () => (

      <Routes>
          <Route path={SelectedPages.Home} element={<Tests1/>}/>
          <Route path={SelectedPages.Login} element={<Login/>}/>
          <Route path={SelectedPages.Registration} element={<Registration/>}/>
          <Route element={<ProtectedRoute requiredRoles={['ADMIN']}/>}>
            <Route path="/admin" element={<Tests1/>}/>
          </Route>
      </Routes>

);


export default AppRoutes;