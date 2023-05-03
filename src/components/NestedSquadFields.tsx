import { useFieldArray } from "react-hook-form";

const NestedSquadFields = ({nestIndex, control, register}: any) => {

    const { fields, append, remove } = useFieldArray({
        control,
        name: `squadFieldArray[${nestIndex}].nestedArray`
    });

    return (
        <>
        <div className='flex flex-row'>
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
                    unitWeapons: (document.getElementById("unitWeaponInput-" + nestIndex) as HTMLInputElement)?.value,
                    }
                )
            }
            >+</button>
        </div>
        <div className='flex flex-col classname-1'>
            {fields.map(( item, index ) => {
                return (
                    <>
                        <div className="flex flex-row">
                            <div className='text-xl text-gray-300 mb-1' key={item.id}>{`squadFieldArray.${nestIndex}.nestedArray`}</div>
                            <button className="text-red-500" onClick={() => remove(item.id)}>x</button>
                        </div>
                    </>
                )
            })}
        </div>
    </>
    )
}

export default NestedSquadFields;