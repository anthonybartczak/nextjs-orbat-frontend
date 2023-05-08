import Navbar from "@/components/Navbar";
import { NextPage } from "next";
import { useSession } from "next-auth/react";

const currentDate = new Date()

export async function getServerSideProps(context: any) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_SITE + `/api/platoons/`)
    const data = await res.json()

    return { props: { data } }
}

const PlatoonIndex: NextPage = ({data}: any) => {
    const { data: session, status } = useSession()

	return (
        <>
            <Navbar status={status} session={session}/>
            <main className="flex flex-col">
            <p className="instructions bg-neutral-900 text-gray-300 text-2xl mt-4 p-3 text-center">
                Below you can find a list of all of the currently available platoon structures.
            </p>
            <ul role="list" className="flex flex-col items-center gap-4 mt-10">
                {data && data.map((item: { id: string; country: string; name: string; branch: string; era: any; }) => (
                        <li className="platoons-card base-transition" key={item.id}>
                            <a href={"/platoons/" + item.id}>
                                <div className="flex">
                                    <img src={"https://flagcdn.com/60x45/" + item.country.toLowerCase() + ".webp"} alt={item.country + " flag"} className="p-2 pr-3" />
                                    <div className="flex flex-col self-center">
                                        <h2 className="text-gray-200 font-semibold text-xl">
                                            {item.name}
                                        </h2>
                                        <p className="flex text-gray-500 text-lg">
                                        <svg className='mt-1 mr-1.5 w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M24 33V15M10 9h28v6H10zM8 32l6-7h19.974L40 32M4 33h8v8H4zm16 0h8v8h-8zm16 0h8v8h-8z"/></svg>
                                            {"Branch - " + item.branch}
                                        <svg className='mt-1 ml-2 mr-1.5 w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M5 22q-.825 0-1.413-.588T3 20V6q0-.825.588-1.413T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.588 1.413T19 22H5Zm0-2h14V10H5v10ZM5 8h14V6H5v2Zm0 0V6v2Zm7 6q-.425 0-.713-.288T11 13q0-.425.288-.713T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14Zm-4 0q-.425 0-.713-.288T7 13q0-.425.288-.713T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14Zm8 0q-.425 0-.713-.288T15 13q0-.425.288-.713T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14Zm-4 4q-.425 0-.713-.288T11 17q0-.425.288-.713T12 16q.425 0 .713.288T13 17q0 .425-.288.713T12 18Zm-4 0q-.425 0-.713-.288T7 17q0-.425.288-.713T8 16q.425 0 .713.288T9 17q0 .425-.288.713T8 18Zm8 0q-.425 0-.713-.288T15 17q0-.425.288-.713T16 16q.425 0 .713.288T17 17q0 .425-.288.713T16 18Z"/></svg>
                                            {JSON.parse(item.era).lower} - {JSON.parse(item.era).upper == '9999' ? currentDate.getFullYear() : JSON.parse(item.era).upper}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </main>
        </>
    )
}

export default PlatoonIndex;