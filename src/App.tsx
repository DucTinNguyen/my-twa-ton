import '@twa-dev/sdk';
import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from 'pages/layout';
import HomePage from 'pages/home';
import AuctionPage from 'pages/autions';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route index element={<HomePage />} />
      <Route path='auction' element={<AuctionPage />} />
    </Route>
  )
)

function App() {

  return (
   <RouterProvider router={router} />
  )
}

export default App
