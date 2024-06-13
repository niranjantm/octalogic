import { createBrowserRouter,RouterProvider } from 'react-router-dom'

import Form1 from './pages/form1'
import './App.css'
import Main from './pages/Main'
import Form2 from './pages/form2'

function App() {
  
  const router = createBrowserRouter([
    {path:"/",element:<Main></Main>,children:[
      {index:true,element:<Form1></Form1>},
      {path:"/form2",element:<Form2></Form2>}
    ]}
  ])


  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App
