import PlatoonNotes from "@/pages/components/PlatoonNotes";
import PlatoonSources from "@/pages/components/PlatoonSources";
import PlatoonStructure from "@/pages/components/PlatoonStructure";
import { NextPage } from "next";

const currentDate = new Date()

export async function getServerSideProps(context: any) {

    var uuid = context.query.uuid;
    console.log(uuid);
    // Fetch data from external API
    const res = await fetch(process.env.PUBLIC_API_SITE + `/api/platoons/${uuid}/details/`)
    const [data] = await res.json()

    // Pass data to the page via props
    return { props: { data } }
}

const PlatoonPost: NextPage = ({data}: any) => {

    const currentDate = new Date()
    const dateStart = JSON.parse(data.era).lower;
    const dateTo = JSON.parse(data.era).upper;

	return (
        <main className="flex flex-col text-gray-300 max-w-2xl place-content-center mx-auto mt-5">
        <div className="flex flex-col text-3xl gap-1 bg-neutral-900 rounded-md p-3 shadow-lg">
          <h1 className="self-center text-3xl">{data.name}</h1>
          <div className="flex flex-row gap-6 self-center mt-2">
            <div className="flex text-xl">
              <svg className='mt-1 mr-1 w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm-8 8v-2.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20H4Z"/></svg>
              {data.structure.size}
            </div>
            <div className="flex">
              <svg className='mt-1 mr-1 w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M5 22q-.825 0-1.413-.588T3 20V6q0-.825.588-1.413T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.588 1.413T19 22H5Zm0-2h14V10H5v10ZM5 8h14V6H5v2Zm0 0V6v2Zm7 6q-.425 0-.713-.288T11 13q0-.425.288-.713T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14Zm-4 0q-.425 0-.713-.288T7 13q0-.425.288-.713T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14Zm8 0q-.425 0-.713-.288T15 13q0-.425.288-.713T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14Zm-4 4q-.425 0-.713-.288T11 17q0-.425.288-.713T12 16q.425 0 .713.288T13 17q0 .425-.288.713T12 18Zm-4 0q-.425 0-.713-.288T7 17q0-.425.288-.713T8 16q.425 0 .713.288T9 17q0 .425-.288.713T8 18Zm8 0q-.425 0-.713-.288T15 17q0-.425.288-.713T16 16q.425 0 .713.288T17 17q0 .425-.288.713T16 18Z"/></svg>
              <span className="text-xl">{dateStart} - {dateTo == '9999' ? currentDate.getFullYear() : dateTo}</span>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <PlatoonStructure {...data.structure}/>
          <PlatoonNotes {...data.notes}/>
          <PlatoonSources {...data.sources}/>
        </div>
      </main>
    )
}

export default PlatoonPost;