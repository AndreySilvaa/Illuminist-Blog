import './App.css';
import { useEffect, useState } from 'react';
import {HashRouter, Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer'
import { onAuthStateChanged } from "firebase/auth";

import { UserAuthentication } from './hooks//userAuthentication'

// PAGES
import Register from './pages/register/Register';
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import About from './pages/About/About'
import Dashboard from './pages/Dashboard/Dashboard'

// CONTEXT
import {AuthProvider} from './context/AuthContext';

// Pages
import CreatePost from './pages/createPost/CreatePost';
import Search from './pages/Search/Search';
import PostDetail from './pages/PostDetail/PostDetail';
import EditPost from './pages/EditPost/EditPost';

function App() {
  const [user, setUser] = useState(undefined)
  const { auth } = UserAuthentication()
  
  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      setUser(user)
    }, [auth])
  })

  
  return (
    <div className="App">
      
        <AuthProvider value={{user}}>

          <HashRouter>
            <Navbar/>
            <div className='container'>
                <Routes>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/register' element={!user ? <Register/> : <Navigate to='/'/>}/>
                  <Route path='/search' element={<Search/>}/>
                  <Route path='/posts/:id' element={<PostDetail/>}/> {/* os ":" simbolizam um parâmetro */}
                  <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>
                  <Route path='/posts/edit/:id' element={user ? <EditPost/> : <Navigate to='/'/>}/>
                  <Route path='/posts/create' element={user ? <CreatePost/> : <Navigate to='/'/>}/>
                  <Route path='/about' element={<About/>}/>
                  <Route path='/dashboard' element={user ? <Dashboard user={user}/> : <Navigate to='/login'/>}/>
                </Routes>
              </div>
            <Footer/>
          </HashRouter>
        </AuthProvider>
        
      
    </div>
  );
}

export default App;
