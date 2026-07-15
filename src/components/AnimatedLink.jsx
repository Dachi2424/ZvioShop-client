import { useNavigate, useLocation } from "react-router-dom"

export default function AnimatedLink({ to, children, ...props }) {
  const navigate = useNavigate()
  const location = useLocation()

  function handleClick(e) {
    e.preventDefault()

    const isBack = to === -1
    if (!isBack && location.pathname === to) return

    const page = document.querySelector(".page")
    if (!page) {
      isBack ? navigate(-1) : navigate(to)
      return
    }

    page.classList.add("page--closing")
    setTimeout(() => {
      isBack ? navigate(-1) : navigate(to)
    }, 300)
  }

  return (
    <a href={isBackSafeHref(to)} onClick={handleClick} {...props}>{children}</a>
  )
}

function isBackSafeHref(to) {
  return to === -1 ? "#" : to
}