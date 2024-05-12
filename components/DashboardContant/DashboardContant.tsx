"use client"

import { useSession, signIn, signOut } from "next-auth/react"

const DashboardContant  = () => {
    const { data: session, status  } = useSession()
    return (
        <div>
            {JSON.stringify(session)}
            {JSON.stringify(status)}
            <button 
             onClick={() => signOut()}
            >{"button"}</button>
        </div>
    )
}

export default DashboardContant