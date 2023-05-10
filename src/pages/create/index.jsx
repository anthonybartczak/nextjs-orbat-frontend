import NestedSquadFields from '@/components/NestedSquadFields';
import SquadFields from '@/components/SquadFields';
import { useState, useEffect } from 'react';
import { useFieldArray, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";

const currentDate = new Date()

const PlatoonCreator = () => {

    const { data: session, status } = useSession()

    const { register, handleSubmit, control, getValues, watch } = useForm();

    const [forceUpdate, setForceUpdate] = useState(0);

    const onFormSubmit = (data) => {
        console.log(data);
    }

	return (
        <>
        <Navbar/>
            <main className="flex flex-col items-center">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <SquadFields
                        control={control}
                        register={register}
                        getValues={getValues}
                        watch={watch}
                    />
                    <input className="platoon-submit-input" type="submit"/>
                </form>
            </main>
        </>
    )
}

export default PlatoonCreator;