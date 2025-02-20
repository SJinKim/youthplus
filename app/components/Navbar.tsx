import Link from 'next/link';
import Image from "next/image"
import React from 'react'
import { auth, signOut, signIn } from '@/auth';

const Navbar = async () => {
 //get user info
 const session = await auth()
 console.log(session)

  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
     <nav className="flex justify-between items-center">
      <Link href="/">
       <Image src="/yp_logo_clr.png" alt="logo" width={144} height={30} />
      </Link>
      <div className="flex items-center gap-5 text-black">
       {session && session?.user ? (
        <>
         <Link href="/startup/create">
          <span>Create</span>
         </Link>
         <form action={async () => { 
          "use server"
          await signOut({redirectTo: '/'})
          }}>
          <span>Sign Out</span>
         </form>
         <Link href={`/user/${session?.user.id}`}>
          <span>{session?.user?.name}</span>
         </Link>
        </>
       ) : (
        <form action={async () => {
         "use server"
         await signIn("google")
        }}>
         <button type="submit">
          Signin with Google
         </button>
        </form>
       )}
      </div>
     </nav>
    </header>
  )
}

export default Navbar