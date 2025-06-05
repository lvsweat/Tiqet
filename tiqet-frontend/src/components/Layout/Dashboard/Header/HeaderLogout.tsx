'use client'

import logOut from "@/utils/logout"

export default function HeaderLogout({ children }: { children: React.ReactNode }) {
  const logout = async () => {
    await logOut()
  }

  return (
    <div onClick={logout} onKeyDown={logout} role="button" tabIndex={0}>
      {children}
    </div>
  )
}
