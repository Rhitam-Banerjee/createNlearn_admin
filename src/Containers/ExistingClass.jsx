import axios from "axios";
import { useEffect, useState } from "react";
import urls from "../utils/urls";
import { useNavigate } from "react-router-dom";

const ExistingClass = () => {
  const navigate = useNavigate();
  const [topicValue, setTopicValue] = useState("");
  const [formValue, setFormValue] = useState({
    classId: "",
    classDate: "",
    timeStart: "",
    timeEnd: "",
    topics: [],
  });
  const createClass = async () => {
    const response = await axios
      .post(
        `${urls.createExistingClass}?class_details=${JSON.stringify(formValue)}`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err));
    if (response && response.status) {
      navigate("/");
    }
  };

  useEffect(() => {
    setFormValue({
      classId: "",
      classDate: "",
      timeStart: "",
      timeEnd: "",
      topics: [],
    });
  }, []);
  return (
    <div className="flex flex-col justify-start items-start gap-[30px] text-[15px] font-semibold">
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[100px]">Class ID</span>
        <input
          className="p-2 rounded-[5px] outline-none"
          type="number"
          value={formValue.classId}
          onChange={({ target: { value } }) =>
            setFormValue({ ...formValue, classId: value })
          }
        />
      </div>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[100px]">Class Date</span>
        <input
          className="p-2 rounded-[5px] outline-none"
          type="date"
          value={formValue.classDate}
          onChange={({ target: { value } }) =>
            setFormValue({ ...formValue, classDate: value })
          }
        />
      </div>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[100px]">Class Start</span>
        <input
          className="p-2 rounded-[5px] outline-none"
          type="time"
          value={formValue.timeStart}
          onChange={({ target: { value } }) =>
            setFormValue({ ...formValue, timeStart: value })
          }
        />
      </div>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[100px]">Class End</span>
        <input
          className="p-2 rounded-[5px] outline-none"
          type="time"
          value={formValue.timeEnd}
          onChange={({ target: { value } }) =>
            setFormValue({ ...formValue, timeEnd: value })
          }
        />
      </div>
      <div className="flex flex-col justify-start items-start gap-[10px]">
        <div className="flex flex-row justify-start items-center gap-[20px]">
          <span className="w-[100px]">Tags</span>
          {formValue.topics?.length == 0 && (
            <span className="bg-errorRed px-2 py-1 rounded-[5px] text-white">
              No Tags Added
            </span>
          )}
          {formValue.topics?.map((topic, index) => {
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
              const currentTopics = Array.isArray(formValue.topics)
                ? formValue.topics
                : [];

              if (!currentTopics.includes(topicValue))
                setFormValue({
                  ...formValue,
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
            navigate("/");
          }}
        >
          Cancle
        </div>
      </div>
    </div>
  );
};

export default ExistingClass;
