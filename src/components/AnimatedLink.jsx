import { useNavigate, useLocation } from "react-router-dom"

export default function AnimatedLink({ to, children, ...props }) {
  const navigate = useNavigate()
  const location = useLocation()

  function handleClick(e) {
    e.preventDefault()
    if (location.pathname === to) return

    const page = document.querySelector(".page")
    if (!page) {
      navigate(to)
      return
    }

    page.classList.add("page--closing")
    setTimeout(() => {
      navigate(to)
    }, 300)
  }

  return (
    <a href={to} onClick={handleClick} {...props}>{children}</a>
  )
}