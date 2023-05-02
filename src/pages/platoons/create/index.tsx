import { NextPage } from "next";
import { useState, useEffect } from 'react';

const currentDate = new Date()

const PlatoonCreator: NextPage = () => {

    const [platoonFields, setPlatoonFields] = useState([{ name: "Platoon"}])

    const addFields = () => {
        let newfield = { name: '' }
        setPlatoonFields([...platoonFields, newfield])
    }

    const handleAddFields = (input: any) => {
        const values = [...platoonFields];
        values.push({
          name: input
        });
        setPlatoonFields(values);
      };

    useEffect(() => {
        const inputEnterKeypress = (event: any) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    console.log(platoonFields)
                    let inputValue = (document.getElementById("squadInput") as HTMLInputElement)?.value
                    handleAddFields(inputValue)
                }
            }
        }
    )

    if (typeof document !== 'undefined') {
        const squadInputField = document.getElementById("squadInput");
        squadInputField?.addEventListener("keypress", function(event) {
            inputEnterKeypress(event)
        });
    }

	return (
        <>
            <div className="flex flex-col w-1/6 absolute left-0 top-0 p-5 bg-gray-700 h-full">
                <label htmlFor="name" className="my-1">Add a squad</label>
                <input id="squadInput" className="p-0.5 text-black" type="text" name="name" placeholder="Enter the squad name here..." required/>
            </div>
            <main className="flex flex-col">
                <div className="flex flex-col items-center mt-12 gap-y-4">
                    {/* <span className="creator-slot-text" data-type="slot">Slot #1</span>
                    <span className="creator-slot-text" data-type="slot">Slot #2</span>
                    <span className="creator-slot-text" data-type="slot">Slot #3</span> */}
                    {platoonFields.map((field, index) => {
                        <div className="text-2xl text-white" key={index}>{field}</div>
                    })}
                </div>
            </main>
        </>
    )
}

export default PlatoonCreator;