import NestedSquadFields from '@/components/NestedSquadFields';
import { useState, useEffect } from 'react';
import { useFieldArray, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";

const currentDate = new Date()

const PlatoonCreator = () => {

    const { data: session, status } = useSession()
    const { register, handleSubmit, control, getValues } = useForm();

    const { fields: squadFields, append: appendSquad, remove: removeSquad, move: moveSquad } = useFieldArray({ control, name: "squadFieldArray"});

    const squadNameField = typeof document !== 'undefined' && (document.getElementById("squadNameInput"));
    const squadCountField = typeof document !== 'undefined' && (document.getElementById("squadCountInput"));

    const onFormSubmit = (data) => {
        console.log(data);
    }

	return (
        <>
        <Navbar status={status} session={session}/>
            <div className="flex flex-col p-3 h-fit fixed w-1/6 bg-neutral-900 shadow-b-xl rounded-br-md">
                <div className='flex flex-col py-1 gap-y-1 w-full'>
                    <input id="squadNameInput" className="p-0.5 text-black rounded-sm shadow-xl" type="text" placeholder="Enter the squad name here..." required/>
                    <input id="squadCountInput" className="p-0.5 text-black rounded-sm shadow-xl" type="number" defaultValue="1" min="1" max="100" placeholder="Enter the squad count here..." required/>
                    <select id="squadHeaderTypeInput" className="p-0.5 text-black rounded-sm shadow-xl">
                        <option>h1</option>
                        <option>h2</option>
                        <option>h3</option>
                    </select>
                    <button className="bg-gray-900 text-white shadow-xl rounded-sm" onClick={() => appendSquad({ name: squadNameField?.value, count: squadCountField.value })}>Add a squad</button>
                </div>
            </div>
            <main className="flex flex-col items-center">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="flex flex-col items-center mt-12 gap-y-4">
                        {squadFields.map(({ id, name, count }, index ) => {
                            return (
                                <div key={index}>
                                    <div className="flex flex-row gap-x-2">
                                        <div className='flex text-gray-200 bg-neutral-900 py-0.5 px-2 text-2xl my-2 gap-x-2 rounded-sm'>
                                            <span>{name}</span>
                                            <span>({count})</span>
                                        </div>
                                        <button className="text-gray-300 text-xl" onClick={() => moveSquad(index, index - 1)}>↑</button>
                                        <button className="text-gray-300 text-xl" onClick={() => moveSquad(index, index + 1)}>↓</button>
                                        <button className="text-red-500 text-xl" onClick={() => removeSquad(index)}>×</button>
                                    </div>
                                    <div id={id} className="flex flex-col gap-x-1">
                                        <NestedSquadFields
                                            id={id}
                                            nestIndex={index}
                                            control={control}
                                            register={register}
                                            getValues={getValues}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <input className="platoon-submit-input" type="submit"/>
                </form>
            </main>
        </>
    )
}

export default PlatoonCreator;