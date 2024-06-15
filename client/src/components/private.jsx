
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'

function Private() {
    const user = useSelector(state=>state.booking)
  return (
    !user.firstName?<Navigate to={"/"}></Navigate>:<Outlet></Outlet>
  )
}

export default Private