import SquadFields from '@/components/SquadFields';
import { useCallback, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { usePersistForm } from '@/hooks/usePersistForm';
import Navbar from "@/components/Navbar";
import axios from 'axios';

const FORM_DATA_KEY = "app_form_local_data";

const PlatoonCreator = ({initialValues}) => {

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, [])

    const getSavedData = useCallback(() => {
        let data = typeof window !== "undefined" && window.localStorage.getItem(FORM_DATA_KEY);
        if (data) {
         // Parse it to a javaScript object
          try {
            data = JSON.parse(data);
          } catch (err) {
            console.log(err);
          }
          return data;
        }
        return initialValues;
    }, [initialValues]);

    const { data: session, status } = useSession()
    const { register, handleSubmit, control, getValues, watch } = useForm(
        {defaultValues: getSavedData(),}
    );

    const platoonName = typeof document !== 'undefined' && (document.getElementById("platoonNameInput"));
    const platoonCount = typeof document !== 'undefined' && (document.getElementById("platoonCountInput"));
    const platoonStartYear = typeof document !== 'undefined' && (document.getElementById("platoonStartYearInput"));
    const platoonEndYear = typeof document !== 'undefined' && (document.getElementById("platoonEndYearInput"));
    const platoonCountry = typeof document !== 'undefined' && (document.getElementById("platoonCountryInput"));
    const platoonBranch = typeof document !== 'undefined' && (document.getElementById("platoonBranchInput"));

    const onFormSubmit = async (data) => {
        //localStorage.removeItem(FORM_DATA_KEY);

        const userId = session?.user.id;
        const startYear = platoonStartYear?.value;
        const endYear = platoonEndYear?.value;

        const era = `{\"bounds\": \"[)\", \"lower\": \"${startYear}\", \"upper\": \"${endYear}\"}`

        const payload = {
            "author_id": userId,
            "name": platoonName?.value,
            "era": era,
            "country": platoonCountry?.value,
            "branch": platoonBranch?.value,
            "structure": {
                "name": platoonName?.value,
                "size": platoonCount?.value,
                "platoon": data.platoon
            }
        };

        const headers = { 'Authorization': 'Bearer ' + session?.access };

        const res = await axios.post(process.env.NEXT_PUBLIC_API_SITE + '/api/create/', payload, { headers })
            .then(response => console.log(response));
    }

    usePersistForm({ value: getValues(), localStorageKey: FORM_DATA_KEY });

	return ( mounted &&
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