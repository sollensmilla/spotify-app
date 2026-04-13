import { useEffect } from "react"

export default function OAuthSuccess() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get("token")

    localStorage.setItem("jwt", token)

    window.location.href = "/"
  }, [])

  return <p>Logging in...</p>
}