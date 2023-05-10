import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
    const { data: sessionData, status } = useSession();

    return (
        <div className="bg-gray-100 font-sans w-full m-0 z-50">
            <div className="bg-neutral-900 shadow-xl">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-2">
                        <div>
                        <Image
                            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                            src="/logo.svg"
                            alt="Next.js Logo"
                            width={100}
                            height={18}
                            priority
                            />
                        </div>

                        <div className="hidden sm:flex sm:items-center">
                            <Link href="/" className="text-gray-200 text-sm font-semibold hover:text-purple-600 mr-4">Home</Link>
                            <Link href="/platoons" className="text-gray-200 text-sm font-semibold hover:text-purple-600 mr-4">Platoons</Link >
                            <Link href="/create" className="text-gray-200 text-sm font-semibold hover:text-purple-600 mr-4">Create</Link >
                        </div>
                        <div className="hidden sm:flex sm:items-center">
                        {status === 'authenticated' ? (
                            <>
                                <div className="flex flex-row gap-x-4 items-center">
                                    <span className="text-gray-200">Hi {sessionData?.user!.user}!</span>
                                    <button
                                        onClick={() => signOut()}
                                        className="text-gray-200 text-sm font-semibold border px-4 py-1 rounded-lg hover:text-purple-600 hover:border-purple-600"
                                    >
                                        Sign Out
                                    </button >
                                </div>
                            </>
                            ) : (
                            <>
                                <button
                                    onClick={() => signIn()}
                                    className="text-gray-200 text-sm font-semibold border px-4 py-1 rounded-lg hover:text-purple-600 hover:border-purple-600"
                                >
                                    Sign In
                                </button >
                            </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
)}

export default Navbar;