import NestedSquadFields from '@/components/NestedSquadFields';
import { useState, useEffect } from 'react';
import { useFieldArray, useForm } from "react-hook-form";

const currentDate = new Date()

const PlatoonCreator = () => {
    const { register, handleSubmit, control } = useForm();

    const { fields: squadFields, append: appendSquad, remove: removeSquad } = useFieldArray({ control, name: "squadFieldArray"});

    const squadNameField = typeof document !== 'undefined' && (document.getElementById("squadNameInput"));
    const squadCountField = typeof document !== 'undefined' && (document.getElementById("squadCountInput"));

    const onFormSubmit = (data) => {
        console.log(data);
    }

	return (
        <>
            <div className="flex flex-col w-1/6 absolute left-0 top-0 p-5 bg-neutral-700 h-full">
                <div className='flex flex-col py-1 gap-y-1'>
                    <input id="squadNameInput" className="p-0.5 text-black" type="text" placeholder="Enter the squad name here..." required/>
                    <input id="squadCountInput" className="p-0.5 text-black" type="number" min="1" max="100" placeholder="Enter the squad count here..." required/>
                </div>
                <button className="bg-gray-600 shadow-md" onClick={() => appendSquad({ name: squadNameField.value, count: squadCountField.value })}>Add a squad</button>
            </div>
            <main className="flex flex-col">
                <form onSubmit={handleSubmit(onFormSubmit)}></form>
                <div className="flex flex-col items-center mt-12 gap-y-4">
                    {squadFields.map(({ id, name, count }, index ) => {
                        return (
                            <div key={id}>
                                <div className="flex flex-row gap-x-2">
                                    <div className=''>{count} x {name}</div>
                                    <button className="text-red-500" onClick={() => removeSquad(index)}>x</button>
                                </div>
                                <div className="flex flex-col text-black gap-x-1">
                                    <NestedSquadFields
                                        index={index}
                                        control={control}
                                        register={register}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </main>
        </>
    )
}

export default PlatoonCreator;