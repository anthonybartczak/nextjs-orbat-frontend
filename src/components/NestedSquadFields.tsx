import { useFieldArray } from "react-hook-form";

const NestedSquadFields = ({id, nestIndex, control, register, getValues }: any) => {

    const { fields, append, remove, move } = useFieldArray({
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
            <button className="bg-gray-600 shadow-md p-1 rounded-full" onClick={
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
        <div className='flex flex-col mt-4'>
            {fields.map(( item, index ) => {
                //console.log(getValues("squadFieldArray"))
                return (
                    <>
                        <div id={id + '-' + index} className="flex flex-row gap-x-2 ml-6" key={item.id}>
                            <span
                                id={nestIndex + "-" + index + "-unitType"}
                                className='squad-unit-field'>
                                {getValues(`squadFieldArray[${nestIndex}].nestedArray[${index}].unitType`)}
                            </span>
                            <span
                                id={nestIndex + "-" + index + "-unitName"}
                                className='squad-unit-field'>
                                {getValues(`squadFieldArray[${nestIndex}].nestedArray[${index}].unitName`)}
                            </span>
                            <span
                                id={nestIndex + "-" + index + "-unitRank"}
                                className='squad-unit-field'>
                                {getValues(`squadFieldArray[${nestIndex}].nestedArray[${index}].unitRank`)}
                            </span>
                            {/* <span
                                id={nestIndex + "-" + index + "-unitWeapons"}
                                className='squad-unit-field'>
                                {getValues(`squadFieldArray[${nestIndex}].nestedArray[${index}].unitWeapons`).join(", ")}
                            </span> */}
                            <button className="text-red-500" onClick={() => remove(index)}>×</button>
                            <button className="text-gray-300" onClick={() => move(index, index - 1)}>↑</button>
                            <button className="text-gray-300" onClick={() => move(index, index + 1)}>↓</button>
                        </div>
                    </>
                )
            })}
        </div>
    </>
    )
}

export default NestedSquadFields;