import Navbar from "@/components/Navbar";
import { NextPage } from "next";
import { useSession, signIn } from "next-auth/react";


const LoginPage: NextPage = () => {
    const { data: session, status } = useSession()

	return (
        <>
            <Navbar session={session}/>
            <main className="flex flex-col">
                <div>Signed in as {session?.user.userName}</div>
            </main>
        </>
    )
}

export default LoginPage;