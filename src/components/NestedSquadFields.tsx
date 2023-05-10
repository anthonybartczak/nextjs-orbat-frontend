import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";

const NestedSquadFields = ({id, nestIndex, control, register, getValues, watch }: any) => {

    const { fields, append, remove, swap } = useFieldArray({
        control,
        name: `squadFieldArray[${nestIndex}].nestedArray`
    });

    return (
        <>
        <div className='flex flex-row gap-x-1'>
            <select id={"unitTypeSelect-" + nestIndex} className="w-1/7 text-center">
                <option>Unit</option>
                <option>Team</option>
            </select>
            <input id={"unitNameInput-" + nestIndex} className="w-1/5 text-center" placeholder="Unit name" type="text"></input>
            <input id={"unitRankInput-" + nestIndex} className="w-1/5 text-center" placeholder="Rank" type="text"></input>
            <input id={"unitWeaponInput-" + nestIndex} className="w-1/5 text-center" placeholder="Weapons" type="text"></input>
            <button type="button" className="bg-gray-600 shadow-md p-1 rounded-full" onClick={
                () => append({
                        unitType: (document.getElementById("unitTypeSelect-" + nestIndex) as HTMLInputElement)?.value,
                        unitName: (document.getElementById("unitNameInput-" + nestIndex) as HTMLInputElement)?.value,
                        unitRank: (document.getElementById("unitRankInput-" + nestIndex) as HTMLInputElement)?.value,
                        unitWeapons: (document.getElementById("unitWeaponInput-" + nestIndex) as HTMLInputElement)?.value.split(","),
                    }
                )
            }
            >+</button>
        </div>
        <ul className='flex flex-col mt-4'>
            {fields.map(( item, index ) => {
                return (
                    <li key={item.id} className="flex flex-row gap-x-2 ml-6">
                        <span
                            className='squad-unit-field'>
                            {watch(`squadFieldArray[${nestIndex}].nestedArray[${index}].unitType`)}
                        </span>
                        <span
                            className='squad-unit-field'>
                            {watch(`squadFieldArray[${nestIndex}].nestedArray[${index}].unitName`)}
                        </span>
                        <span
                            className='squad-unit-field'>
                            {watch(`squadFieldArray[${nestIndex}].nestedArray[${index}].unitRank`)}
                        </span>
                        <span
                            //id={nestIndex + "-" + index + "-unitWeapons"}
                            className='squad-unit-field'>
                            {getValues(`squadFieldArray[${nestIndex}].nestedArray[${index}].unitWeapons`).join(", ")}
                        </span>
                        <button
                            type="button"
                            className="text-red-500"
                            onClick={() => remove(index)}
                        >×</button>
                        <button
                            type="button"
                            className="text-gray-300"
                            hidden={index === 0}
                            onClick={() => swap(index, index - 1)}
                        >↑</button>
                        <button
                            type="button"
                            className="text-gray-300"
                            hidden={index === fields.length - 1}
                            onClick={() => swap(index, index + 1)}
                        >↓</button>
                    </li>
                    )
             })}
        </ul>
    </>
    )
}

export default NestedSquadFields;