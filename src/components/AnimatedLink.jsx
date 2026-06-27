import { useNavigate } from "react-router-dom"

 
 
export default function AnimatedLink({to, children ,...props}) {
 
  const navigate = useNavigate()

  function handleClick(e){
    e.preventDefault()
    document.querySelector(".page").classList.add("page--closing")
    setTimeout(() => navigate(to), 500)
  }


  return (
    <a href={to} onClick={handleClick} {...props}>{children}</a>
  )
}