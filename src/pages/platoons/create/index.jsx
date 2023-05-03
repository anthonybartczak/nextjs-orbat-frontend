import { useState, useEffect } from 'react';
import { useFieldArray, useForm } from "react-hook-form";

const currentDate = new Date()

const PlatoonCreator = () => {
    const { register, handleSubmit, control } = useForm();
    const { fields, append, remove } = useFieldArray({ control, name: "test" });

    const squadInputField = typeof document !== 'undefined' && (document.getElementById("squadInput"));

    const onFormSubmit = (data) => {
        console.log(data);
    }

	return (
        <>
            <div className="flex flex-col w-1/6 absolute left-0 top-0 p-5 bg-gray-700 h-full">
                <input id="squadInput" className="p-0.5 text-black" type="text" name="name" placeholder="Enter the squad name here..." required/>
                <button className="bg-gray-600 shadow-md" onClick={() => append({ name: squadInputField.value })}>Add a squad</button>
            </div>
            <main className="flex flex-col">
                <form onSubmit={handleSubmit(onFormSubmit)}></form>
                <div className="flex flex-col items-center mt-12 gap-y-4">
                    {fields.map(({ id, name }, index ) => {
                        return (
                            <div className="flex flex-row gap-x-2" key={id}>
                                <div>{name}</div>
                                <button className="text-red-500" onClick={() => remove(index)}>x</button>
                            </div>
                        )
                    })}
                </div>
            </main>
        </>
    )
}

export default PlatoonCreator;