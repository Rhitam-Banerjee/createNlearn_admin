/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import urls from "../utils/urls";
const NewCourse = () => {
  const navigate = useNavigate();
  const [missingValues, setMissingValues] = useState(false);
  const [otherValue, setOtherValue] = useState("");
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [availibilityChecked, setAvailibilityChecked] = useState(false);
  const courseTypes = ["English", "Maths", "Coding", "Minecraft", "Music"];
  const [courseRelevant, setCourseRelevant] = useState([
    "KG",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Other",
  ]);
  const courseLevel = ["Beginner", "Intermediate", "Advance"];
  const courseLocation = [
    "India",
    "US and Canada",
    "Middle East",
    "Europe",
    "Australia",
  ];

  const [formValues, setFormValues] = useState({
    name: "",
    subject: "English",
    courseRelevant: "KG",
    courseLevel: "Beginner",
    courseLocation: "India",
    duration_days: 1,
    start_date: "",
    time_start: "",
    time_end: "",
    teacher: "",
    frequency: "daily",
  });

  const createCourse = async () => {
    const { name, start_date, time_start, time_end, teacher } = formValues;
    if (
      name == "" ||
      start_date == "" ||
      time_start == "" ||
      time_end == "" ||
      teacher == ""
    ) {
      setMissingValues(true);
      return false;
    }
    const response = await axios
      .post(
        `${urls.createCourse}?course_details=${JSON.stringify(
          formValues
        )}&course_relevant=${
          formValues.courseRelevant === "Other"
            ? otherValue
            : formValues.courseRelevant
        }`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err));
    if (response && response.status) {
      navigate("/");
    }
  };

  const checkTeacherAvailibility = async () => {
    const { name, start_date, time_start, time_end, teacher } = formValues;

    if (name == "" || start_date == "" || time_start == "" || time_end == "") {
      setMissingValues(true);
      return false;
    }

    try {
      const response = await axios
        .get(
          `${urls.getTeacherAvailable}?course_details=${JSON.stringify(
            formValues
          )}`
        )
        .then((res) => res.data)
        .catch((err) => console.log(err));
      if (response && response.status) {
        setAvailableTeachers(response.teachers);
        setAvailibilityChecked(true);
        setMissingValues(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFormValues({
      name: "",
      subject: "English",
      courseRelevant: "KG",
      courseLevel: "Beginner",
      courseLocation: "India",
      duration_days: 1,
      start_date: "",
      time_start: "",
      time_end: "",
      teacher: "",
      frequency: "daily",
    });
  }, []);
  return (
    <div className="flex flex-col justify-start items-start gap-[30px] text-[15px] font-semibold">
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[200px]">Course Name</span>
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
        <span className="w-[200px]">Course Type</span>
        <select
          value={formValues.subject}
          className="p-2 rounded-[5px] outline-none"
          onChange={({ target: { value } }) =>
            setFormValues({ ...formValues, subject: value })
          }
        >
          {courseTypes.map((type, index) => {
            return (
              <option value={type} key={index}>
                {type}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[200px]">Course Relevant</span>
        <select
          value={formValues.courseRelevant}
          className="p-2 rounded-[5px] outline-none"
          onChange={({ target: { value } }) =>
            setFormValues({ ...formValues, courseRelevant: value })
          }
        >
          {courseRelevant.map((type, index) => {
            return (
              <option value={type} key={index}>
                {type}
              </option>
            );
          })}
        </select>
        {formValues.courseRelevant === "Other" && (
          <input
            type="text"
            className="p-2 rounded-[5px] outline-none"
            value={otherValue}
            onChange={({ target: { value } }) => {
              setOtherValue(value);
            }}
          />
        )}
      </div>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[200px]">Course Level</span>
        <select
          value={formValues.courseLevel}
          className="p-2 rounded-[5px] outline-none"
          onChange={({ target: { value } }) =>
            setFormValues({ ...formValues, courseLevel: value })
          }
        >
          {courseLevel.map((type, index) => {
            return (
              <option value={type} key={index}>
                {type}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[200px]">Course Location</span>
        <select
          value={formValues.courseLocation}
          className="p-2 rounded-[5px] outline-none"
          onChange={({ target: { value } }) =>
            setFormValues({ ...formValues, courseLocation: value })
          }
        >
          {courseLocation.map((type, index) => {
            return (
              <option value={type} key={index}>
                {type}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[200px]">Start date</span>
        <input
          placeholder="Start Date"
          className="p-2 rounded-[5px] outline-none"
          type="date"
          value={formValues.start_date}
          onChange={({ target: { value } }) =>
            setFormValues({ ...formValues, start_date: value })
          }
        />
      </div>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[200px]">Number of Classes</span>
        <input
          placeholder="Name"
          className="p-2 rounded-[5px] outline-none"
          type="number"
          value={formValues.duration_days}
          onChange={({ target: { value } }) =>
            setFormValues({ ...formValues, duration_days: value })
          }
        />
      </div>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[200px]">Class Start</span>
        <input
          className="p-2 rounded-[5px] outline-none"
          type="time"
          value={formValues.time_start}
          onChange={({ target: { value } }) =>
            setFormValues({ ...formValues, time_start: value })
          }
        />
      </div>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[200px]">Class End</span>
        <input
          className="p-2 rounded-[5px] outline-none"
          type="time"
          value={formValues.time_end}
          onChange={({ target: { value } }) =>
            setFormValues({ ...formValues, time_end: value })
          }
        />
      </div>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[200px]">Class Frequency</span>
        <select
          value={formValues.frequency}
          className="p-2 rounded-[5px] outline-none"
          onChange={({ target: { value } }) =>
            setFormValues({ ...formValues, frequency: value })
          }
        >
          <option value={"daily"}>Daily</option>
          <option value={"weekly"}>Weekly</option>
        </select>
      </div>
      <div
        className="text-white font-bold bg-secondary p-2 rounded-[5px] cursor-pointer"
        onClick={() => checkTeacherAvailibility()}
      >
        Check Teacher Availability
      </div>
      {availibilityChecked && availableTeachers.length > 0 && (
        <div className="flex flex-row justify-start items-center gap-[20px]">
          <span className="w-[200px]">Teachers Available</span>
          <select
            value={formValues.teacher}
            className="p-2 rounded-[5px] outline-none"
            onChange={({ target: { value } }) =>
              setFormValues({ ...formValues, teacher: value })
            }
          >
            {availableTeachers.map((teacher, index) => {
              return (
                <option value={teacher.id} key={index}>
                  {teacher.name}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {availableTeachers.length == 0 && availibilityChecked && (
        <div className="text-errorRed font-bold text-[15px]">
          No Teachers Available
        </div>
      )}
      {missingValues && (
        <div className="text-errorRed font-bold text-[15px]">
          Details missing
        </div>
      )}
      <div className="flex flex-row justify-start items-center gap-[20px]">
        {availibilityChecked && (
          <div
            className="px-4 py-2 bg-successGreen text-white rounded-[5px]"
            onClick={() => createCourse()}
          >
            Create
          </div>
        )}
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

export default NewCourse;
