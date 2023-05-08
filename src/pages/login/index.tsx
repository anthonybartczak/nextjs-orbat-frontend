import Navbar from "@/components/Navbar";
import { NextPage } from "next";
import { useSession, signIn } from "next-auth/react";
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const LoginPage: NextPage = () => {
    const { data: session, status } = useSession()
    const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_API_SITE + '/api/user', fetcher)

	return (
        <>
            <Navbar status={status} session={session}/>
            <main className="flex flex-col">
                {/* <div>Signed in as {session?.user.userName}</div> */}
            </main>
        </>
    )
}

export default LoginPage;