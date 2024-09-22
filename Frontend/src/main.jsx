import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './context/Usercontext.jsx'
import ImageContextProvider from './context/Imagecontext.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Homepage from './components/Homepage.jsx'
import Image from './components/Image.jsx'
import Login from './auth/Login.jsx'
import Signup from './auth/Signup.jsx'
import PrivateRoute from './Private/Privateroute.jsx'
import { UserContextProvider } from './context/opContext.jsx'
const router = createBrowserRouter([
  {
  path: '/',
  element: <PrivateRoute><App/></PrivateRoute>,
  children:[
    {
      path: '',
      element: <Homepage/>,
    },
    {
      path: 'image',
      element: <Image/>,
    }
  ]
  },
  {
    path: 'login',
    element: <Login/>
  },
  {
    path: '*',
    element: <div className='w-full h-screen capitalize text-4xl bg-black text-white flex justify-center items-center'><div>Page not found</div></div>,
  },
  {
    path: '/signup',
    element: <Signup/>,
  }

    
])
createRoot(document.getElementById('root')).render(
  <ImageContextProvider>
    <ContextProvider>
      <UserContextProvider>
      <RouterProvider router={router} />
      </UserContextProvider>
    </ContextProvider>
  </ImageContextProvider>
)
