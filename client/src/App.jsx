import { createBrowserRouter,RouterProvider } from 'react-router-dom'

import Form1 from './pages/form1'
import './App.css'
import Main from './pages/Main'
import Form2 from './pages/form2'
import Form3 from './pages/form3'
import Form4 from './pages/form4'
import Form5 from './pages/form5'
import Conformation from './pages/conformation'
import Private from './components/private'

function App() {
  
  const router = createBrowserRouter([
    {path:"/",element:<Main></Main>,children:[
      {index:true,element:<Form1></Form1>},
      {element:<Private></Private>,children:[
 {path:"/form2",element:<Form2></Form2>},
      {path:"/form3/:typeOfWheel",element:<Form3></Form3>},
      {path:"/form4/:vehicleType",element:<Form4></Form4>},
      {path:"/form5",element:<Form5></Form5>},
      {path:"/conformation",element:<Conformation></Conformation>}
      ]}
     
    ]}
  ])


  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App
