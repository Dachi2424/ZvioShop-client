import { useLocation, useNavigate } from "react-router-dom"

 
export default function AnimatedLink({to, children ,...props}) {
 
  const navigate = useNavigate()
  const location = useLocation()

  function handleClick(e) {
    e.preventDefault()
   
    if(location.pathname === to) return;

    document.querySelector(".page").classList.add("page--closing")
    setTimeout(() => {
      navigate(to)
      document.querySelector(".page").classList.remove("page--closing")
    }, 500)
  }


  return (
    <a href={to} onClick={handleClick} {...props}>{children}</a>
  )
}