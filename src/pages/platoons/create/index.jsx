import NestedSquadFields from '@/components/NestedSquadFields';
import { useState, useEffect } from 'react';
import { useFieldArray, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";

const currentDate = new Date()

const PlatoonCreator = () => {

    const { data: session, status } = useSession()
    const { register, handleSubmit, control, getValues } = useForm();

    const { fields: squadFields, append: appendSquad, remove: removeSquad } = useFieldArray({ control, name: "squadFieldArray"});

    const squadNameField = typeof document !== 'undefined' && (document.getElementById("squadNameInput"));
    const squadCountField = typeof document !== 'undefined' && (document.getElementById("squadCountInput"));

    const onFormSubmit = (data) => {
        console.log(data);
    }

	return (
        <>
        <Navbar status={status} session={session}/>
            <div className="flex flex-col w-1/6 absolute left-0 top-0 p-5 bg-neutral-700 h-full">
                <div className='flex flex-col py-1 gap-y-1'>
                    <input id="squadNameInput" className="p-0.5 text-black" type="text" placeholder="Enter the squad name here..." required/>
                    <input id="squadCountInput" className="p-0.5 text-black" type="number" defaultValue="1" min="1" max="100" placeholder="Enter the squad count here..." required/>
                </div>
                <button className="bg-gray-600 shadow-md" onClick={() => appendSquad({ name: squadNameField.value, count: squadCountField.value })}>Add a squad</button>
            </div>
            <main className="flex flex-col items-center">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="flex flex-col items-center mt-12 gap-y-4">
                        {squadFields.map(({ id, name, count }, index ) => {
                            return (
                                <div key={id}>
                                    <div className="flex flex-row gap-x-2">
                                        <div className='text-gray-200 text-2xl my-2'>{count} x {name}</div>
                                        <button className="text-red-500" onClick={() => removeSquad(index)}>x</button>
                                    </div>
                                    <div className="flex flex-col gap-x-1">
                                        <NestedSquadFields
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