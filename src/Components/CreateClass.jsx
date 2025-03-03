import { useState } from "react";
import { NewClass, ExistingClass } from "../Containers";
const CreateClass = () => {
  const [classNew, setClassNew] = useState(true);
  return (
    <div className="bg-gray-200 p-6 pt-[130px] text-[15px] w-full flex flex-col justify-start items-start">
      <div className="w-max m-auto text-[20px] font-bold">Create Class</div>
      <div className="py-[30px] flex flex-row justify-start items-center gap-[20px]">
        <span
          className={`${
            classNew ? "bg-secondary text-white" : "bg-lightGrey"
          } font-semibold px-4 py-2 rounded-[5px] cursor-pointer`}
          onClick={() => {
            setClassNew(true);
          }}
        >
          New Class
        </span>
        <span
          className={`${
            !classNew ? "bg-secondary text-white" : "bg-lightGrey"
          } font-semibold px-4 py-2 rounded-[5px] cursor-pointer`}
          onClick={() => {
            setClassNew(false);
          }}
        >
          Existing Class
        </span>
      </div>
      {classNew ? <NewClass /> : <ExistingClass />}
    </div>
  );
};

export default CreateClass;
