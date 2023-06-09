import NestedSquadFields from "@/components/NestedSquadFields";
import { useFieldArray } from "react-hook-form";

const SquadFields = ({ control, register, getValues, watch }) => {
  const {
    fields: squadFields,
    append: appendSquad,
    remove: removeSquad,
    swap: swapSquad,
  } = useFieldArray({ control, name: "platoon" });

  return (
    <>
      <div className="flex flex-col p-3 h-fit fixed left-0 w-1/6 bg-neutral-900 shadow-b-xl rounded-br-md">
        <div className="flex flex-col py-1 w-full">
        <div className="flex flex-col gap-y-1">
            <input
              id="platoonNameInput"
              className="p-0.5 text-black rounded-sm shadow-xl"
              type="text"
              placeholder="Enter the platoon name here..."
              required
            />
            <input
              id="platoonCountInput"
              className="p-0.5 text-black rounded-sm shadow-xl"
              type="number"
              placeholder="Enter the platoon units count here..."
              required
            />
            <div className="flex flex-row gap-x-1">
              <input
                id="platoonStartYearInput"
                className="p-0.5 w-1/2 text-black rounded-sm shadow-xl"
                min="1000"
                max="9999"
                type="number"
                placeholder="Start year"
                required
              />
              <input
                id="platoonEndYearInput"
                className="p-0.5 w-1/2 text-black rounded-sm shadow-xl"
                min="1000"
                max="9999"
                type="number"
                placeholder="End year"
                required
              />
            </div>
            <input
                id="platoonCountryInput"
                className="p-0.5 text-black rounded-sm shadow-xl"
                type="text"
                placeholder="Enter the country code here..."
                required
              />
              <input
                id="platoonBranchInput"
                className="p-0.5 text-black rounded-sm shadow-xl"
                type="text"
                placeholder="Enter the branch here..."
                required
              />
          </div>
          <div className="flex flex-col gap-y-1 mt-12">
            <input
              id="squadNameInput"
              className="p-0.5 text-black rounded-sm shadow-xl"
              type="text"
              placeholder="Enter the squad name here..."
              required
            />
            <input
              id="squadCountInput"
              className="p-0.5 text-black rounded-sm shadow-xl"
              type="number"
              defaultValue="1"
              min="1"
              max="100"
              placeholder="Enter the squad count here..."
              required
            />
            <select
              id="squadHeaderTypeInput"
              className="p-0.5 text-black rounded-sm shadow-xl"
            >
              <option>h1</option>
              <option>h2</option>
              <option>h3</option>
            </select>
            <button
              type="button"
              className="bg-gray-900 text-white shadow-xl rounded-sm"
              onClick={() =>
                appendSquad({
                  name: document.getElementById("squadNameInput")?.value,
                  count: parseInt(document.getElementById("squadCountInput")?.value),
                  type: "squad",
                  headerType: document.getElementById("squadHeaderTypeInput")?.value,
                })
              }
            >
              Add a squad
            </button>
          </div>
        </div>
      </div>
      <ul className="flex flex-col items-center mt-12 gap-y-4">
        {squadFields.map((item, index) => {
          return (
            <li key={item.id}>
              <div className="flex flex-row gap-x-2">
                <div className="flex text-gray-200 bg-neutral-900 py-0.5 px-2 text-2xl my-2 gap-x-2 rounded-sm">
                  <span>{item.name}</span>
                  <span>
                    ({item.count == 1 ? item.count + " squad" : item.count + " squads"})
                  </span>
                </div>
                <button
                  type="button"
                  className="text-gray-300 text-xl"
                  hidden={index === 0}
                  onClick={() => swapSquad(index, index - 1)}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="text-gray-300 text-xl"
                  hidden={index === squadFields.length - 1}
                  onClick={() => swapSquad(index, index + 1)}
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="text-red-500 text-xl"
                  onClick={() => removeSquad(index)}
                >
                  ×
                </button>
              </div>
              <div className="flex flex-col gap-x-1">
                <NestedSquadFields
                  id={item.id}
                  nestIndex={index}
                  control={control}
                  register={register}
                  getValues={getValues}
                  watch={watch}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default SquadFields;
