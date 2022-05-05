import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { Navigation } from './element/Navigation';
import { AuthContext } from './tool/Context';
import { privateRoutes, publicRoutes, RouteNames } from './types/IRoute';
import './App.css';
import 'materialize-css'
import { useAuth } from './hooks/auth.hook';

const App = () => {
  const {login, logout, userAuth} = useAuth()
  
  return (
    <AuthContext.Provider value={{login, logout, userAuth}}>

    <div className="App">
      <BrowserRouter>
        <Navigation />
        {!userAuth.userId ?
        <Routes>   
          {publicRoutes.map(route =>
            <Route 
              path={route.path}
              element={<route.element />} 
              key={route.path}
            />
          )}  
          <Route 
            path='*'
            element={ <Navigate to={RouteNames.LOGIN} replace/> } 
          />
        </Routes> 
        :
        <Routes>  
          {privateRoutes.map(route =>
            <Route 
              path={route.path}
              element={<route.element />} 
              key={route.path}
            />
          )}  
          <Route 
            path='*'
            element={ <Navigate to={RouteNames.CHAT} replace/> } 
          />
        </Routes>
        }
      </BrowserRouter>
    </div>
    </AuthContext.Provider>

  );
}

export default App