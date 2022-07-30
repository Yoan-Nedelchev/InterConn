import './App.css';

import { useState } from 'react'

import Navigation from './components/navComponent/Navigation'
import HomePage from './components/homePage/HomePage'
import UserLogin from './components/userLogIn/UserLogin'
import UserRegistration from './components/userRegister/UserRegistration'

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom'

import { UserProvider } from './contexts/userContext'

function App() {
  return (
    <UserProvider>
      <div className="App">
        <BrowserRouter>
          <header className="App-header">
            <Navigation />
          </header>
          <Routes>
            <Route path="/" c element={<HomePage />} />
            <Route path="/register" element={<UserRegistration />} />
            <Route path="/login" element={<UserLogin/>} />
          </Routes>
          <footer>
          </footer>
        </BrowserRouter>
      </div >
    </UserProvider>
  );
};

export default App;
