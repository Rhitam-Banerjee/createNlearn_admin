import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import urls from "../utils/urls";
import { useSelector } from "react-redux";
const NewClass = () => {
  const navigate = useNavigate();
  const { allTeachers } = useSelector((store) => store.details);
  const [activeTeacher, setActiveTeacher] = useState("");
  const [topicValue, setTopicValue] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    courseId: "",
    classDate: "",
    timeStart: "",
    timeEnd: "",
    topics: [],
  });

  const createClass = async () => {
    const response = await axios
      .post(
        `${urls.createNewClass}?class_details=${JSON.stringify(
          formValues
        )}&teacher_id=${activeTeacher}`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err));
    if (response && response.status) {
      navigate("/");
    }
  };

  useEffect(() => {
    setFormValues({
      name: "",
      courseId: "",
      classDate: "",
      timeStart: "",
      timeEnd: "",
      topics: [],
    });
  }, []);
  return (
    <div className="flex flex-col justify-start items-start gap-[30px] text-[15px] font-semibold">
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[100px]">Class Name</span>
        <input
          placeholder="Name"
          className="p-2 rounded-[5px] outline-none"
          type="text"
          value={formValues.name}
          onChange={({ target: { value } }) =>
            setFormValues({ ...formValues, name: value })
          }
        />
      </div>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[100px]">Course ID</span>
        <input
          className="p-2 rounded-[5px] outline-none"
          type="text"
          placeholder="ID"
          value={formValues.courseId}
          onChange={({ target: { value } }) =>
            setFormValues({ ...formValues, courseId: value })
          }
        />
      </div>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[100px]">Class Date</span>
        <input
          className="p-2 rounded-[5px] outline-none"
          type="date"
          value={formValues.classDate}
          onChange={({ target: { value } }) =>
            setFormValues({ ...formValues, classDate: value })
          }
        />
      </div>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[100px]">Class Start</span>
        <input
          className="p-2 rounded-[5px] outline-none"
          type="time"
          value={formValues.timeStart}
          onChange={({ target: { value } }) =>
            setFormValues({ ...formValues, timeStart: value })
          }
        />
      </div>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[100px]">Class End</span>
        <input
          className="p-2 rounded-[5px] outline-none"
          type="time"
          value={formValues.timeEnd}
          onChange={({ target: { value } }) =>
            setFormValues({ ...formValues, timeEnd: value })
          }
        />
      </div>
      {allTeachers?.length && (
        <div className="flex flex-row justify-start items-center gap-[10px]">
          <span className="w-[110px]">Teachers</span>
          <select
            className="p-2 rounded-[5px] outline-none"
            value={activeTeacher}
            onChange={({ target: { value } }) => {
              setActiveTeacher(value);
            }}
          >
            {allTeachers?.map((level, index) => {
              return (
                <option value={level.id} key={index}>
                  {level.name}
                </option>
              );
            })}
          </select>
        </div>
      )}
      <div className="flex flex-col justify-start items-start gap-[10px]">
        <div className="flex flex-row justify-start items-center gap-[20px]">
          <span className="w-[100px]">Tags</span>
          {formValues.topics?.length == 0 && (
            <span className="bg-errorRed px-2 py-1 rounded-[5px] text-white">
              No Tags Added
            </span>
          )}
          {formValues.topics?.map((topic, index) => {
            return (
              <div
                key={index}
                className="bg-successGreen px-2 py-1 rounded-[5px] text-white"
              >
                {topic}
              </div>
            );
          })}
        </div>
        <div className="flex flex-row justify-start items-center gap-[20px]">
          <input
            className="p-2 rounded-[5px] outline-none"
            type="text"
            placeholder="Tag"
            value={topicValue}
            onChange={({ target: { value } }) => {
              setTopicValue(value);
            }}
          />
          <div
            className="bg-secondary px-4 py-2 text-white rounded-[5px] cursor-pointer"
            onClick={() => {
              if (!topicValue.trim()) return;
              const currentTopics = Array.isArray(formValues.topics)
                ? formValues.topics
                : [];

              if (!currentTopics.includes(topicValue))
                setFormValues({
                  ...formValues,
                  topics: [...currentTopics, topicValue], // Ensure we always spread an array
                });
              setTopicValue("");
            }}
          >
            Add Tag
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <div
          className="px-4 py-2 bg-successGreen text-white rounded-[5px]"
          onClick={() => createClass()}
        >
          Create
        </div>
        <div
          className="px-4 py-2 bg-errorRed text-white rounded-[5px]"
          onClick={() => {
            setTopicValue("");
            navigate("/");
          }}
        >
          Cancle
        </div>
      </div>
    </div>
  );
};

export default NewClass;
