import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import urls from "../utils/urls";
const AddTeacher = () => {
  const definedSlots = [
    "12:00am - 3:00am",
    "3:00am - 6:00am",
    "6:00am - 9:00am",
    "9:00am - 12:00pm",
    "12:00pm - 3:00pm",
    "3:00pm - 6:00pm",
    "6:00pm - 9:00pm",
    "9:00pm - 12:00am",
  ];
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    password: "",
    mobile_number: "",
    alternate_number: "",
    english_fluency: 0,
    meeting_fluency: "",
    address: "",
    dob: "",
    linkedin_id: "",
    cv_link: "",
    adhar_card_number: "",
    pan_card_number: "",
    days: [0, 0, 0, 0, 0, 0, 0],
    slots: [0, 0, 0, 0, 0, 0, 0, 0],
  });

  const createTeacher = async () => {
    const { name, mobile_number, password, dob } = formValues;
    if (name === "" || mobile_number == "" || password === "" || dob === "")
      return false;
    const response = await axios
      .post(
        `${urls.createTeacher}?teacher_details=${JSON.stringify(formValues)}`
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
      password: "",
      mobile_number: "",
      alternate_number: "",
      english_fluency: 0,
      meeting_fluency: 0,
      address: "",
      dob: "",
      linkedin_id: "",
      cv_link: "",
      adhar_card_number: "",
      pan_card_number: "",
      days: [0, 0, 0, 0, 0, 0, 0],
      slots: [0, 0, 0, 0, 0, 0, 0, 0],
    });
  }, []);
  return (
    <div className="mt-[60px] min-h-[calc(100vh-60px)] p-6 flex flex-col justify-start items-start gap-[30px] text-[15px] font-semibold bg-secondary text-white">
      <span className="text-[30px] text-black font-bold">Teacher Details</span>

      <div className="h-full flex flex-row flex-wrap justify-start items-center gap-[30px]">
        <div className="h-full flex flex-col justify-start items-start gap-[20px] p-4 bg-mainColorLightTransparent rounded-[5px]">
          <span className="font-bold text-[20px] text-white">
            Basic Details
          </span>
          <div className="flex flex-row justify-start items-center gap-[20px]">
            <span className="w-[130px]">Name *</span>
            <input
              placeholder=""
              className="p-2 rounded-[5px] outline-none"
              type="text"
              value={formValues.name}
              onChange={({ target: { value } }) =>
                setFormValues({ ...formValues, name: value })
              }
            />
          </div>
          <div className="flex flex-row justify-start items-center gap-[20px]">
            <span className="w-[130px]">Mobile Number *</span>
            <input
              className="p-2 rounded-[5px] outline-none"
              type="number"
              placeholder=""
              value={formValues.mobile_number}
              onChange={({ target: { value } }) =>
                setFormValues({ ...formValues, mobile_number: value })
              }
            />
          </div>
          <div className="flex flex-row justify-start items-center gap-[20px]">
            <span className="w-[130px]">Alternate Number</span>
            <input
              className="p-2 rounded-[5px] outline-none"
              type="number"
              placeholder=""
              value={formValues.alternate_number}
              onChange={({ target: { value } }) =>
                setFormValues({ ...formValues, alternate_number: value })
              }
            />
          </div>
          <div className="flex flex-row justify-start items-center gap-[20px]">
            <span className="w-[130px]">Password *</span>
            <input
              className="p-2 rounded-[5px] outline-none"
              type="text"
              value={formValues.password}
              onChange={({ target: { value } }) =>
                setFormValues({ ...formValues, password: value })
              }
            />
          </div>
          <div className="flex flex-row justify-start items-center gap-[20px]">
            <span className="w-[130px]">Address</span>
            <textarea
              className="p-2 rounded-[5px] outline-none"
              type="number"
              value={formValues.address}
              onChange={({ target: { value } }) =>
                setFormValues({ ...formValues, address: value })
              }
            />
          </div>
          <div className="flex flex-row justify-start items-center gap-[20px]">
            <span className="w-[130px]">DOB *</span>
            <input
              className="p-2 rounded-[5px] outline-none"
              type="date"
              value={formValues.dob}
              onChange={({ target: { value } }) =>
                setFormValues({ ...formValues, dob: value })
              }
            />
          </div>
        </div>

        <div className="h-full flex flex-col justify-start items-start gap-[20px] p-4 bg-mainColorLightTransparent rounded-[5px]">
          <span className="font-bold text-[20px] text-white">
            Day Availibility
          </span>
          {[
            "Monday",
            "Tuesday",
            "Wednessday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day, index) => {
            return (
              <div
                key={index}
                className="flex flex-row justify-start items-center gap-[20px]"
              >
                <span className="w-[130px]">{day}</span>
                <select
                  className="p-1 rounded-[5px]"
                  value={formValues.days[index]}
                  onChange={({ target: { value } }) => {
                    let newDays = formValues.days;
                    newDays[index] = value;
                    setFormValues({ ...formValues, days: newDays });
                  }}
                >
                  <option value={0}>Not Available</option>
                  <option value={1}>Available</option>
                </select>
              </div>
            );
          })}
        </div>
        <div className="h-full flex flex-col justify-start items-start gap-[20px] p-4 bg-mainColorLightTransparent rounded-[5px]">
          <span className="font-bold text-[20px] text-white">
            Slot Availibility
          </span>
          {definedSlots.map((slot, index) => {
            return (
              <div
                key={index}
                className="flex flex-row justify-start items-center gap-[20px]"
              >
                <span className="w-[130px]">{slot}</span>
                <select
                  className="p-1 rounded-[5px]"
                  value={formValues.slots[index]}
                  onChange={({ target: { value } }) => {
                    let newSlots = formValues.slots;
                    newSlots[index] = value;
                    setFormValues({ ...formValues, slots: newSlots });
                  }}
                >
                  <option value={0}>Not Available</option>
                  <option value={1}>Available</option>
                </select>
              </div>
            );
          })}
        </div>

        <div className="h-full flex flex-col justify-start items-start gap-[20px] p-4 bg-mainColorLightTransparent rounded-[5px]">
          <span className="font-bold text-[20px] text-white">
            Extra Details
          </span>
          <div className="flex flex-row justify-start items-center gap-[20px]">
            <span className="w-[130px]">English Fluency</span>
            <input
              className="rounded-[5px] outline-none"
              type="range"
              min={0}
              max={10}
              value={formValues.english_fluency}
              onChange={({ target: { value } }) =>
                setFormValues({ ...formValues, english_fluency: value })
              }
            />
            <span>{formValues.english_fluency}</span>
          </div>
          <div className="flex flex-row justify-start items-center gap-[20px]">
            <span className="w-[130px]">Meeting Fluency</span>
            <input
              className="rounded-[5px] outline-none"
              type="range"
              min={0}
              max={10}
              value={formValues.meeting_fluency}
              onChange={({ target: { value } }) =>
                setFormValues({ ...formValues, meeting_fluency: value })
              }
            />
            <span>{formValues.meeting_fluency}</span>
          </div>
        </div>

        <div className="h-full flex flex-col justify-start items-start gap-[20px] p-4 bg-mainColorLightTransparent rounded-[5px]">
          <span className="font-bold text-[20px] text-white">Work Links</span>
          <div className="flex flex-row justify-start items-center gap-[20px]">
            <span className="w-[130px]">Linked In</span>
            <input
              className="p-2 rounded-[5px] outline-none"
              type="text"
              value={formValues.linkedin_id}
              onChange={({ target: { value } }) =>
                setFormValues({ ...formValues, linkedin_id: value })
              }
            />
          </div>
          <div className="flex flex-row justify-start items-center gap-[20px]">
            <span className="w-[130px]">CV Link</span>
            <input
              className="p-2 rounded-[5px] outline-none"
              type="text"
              value={formValues.cv_link}
              onChange={({ target: { value } }) =>
                setFormValues({ ...formValues, cv_link: value })
              }
            />
          </div>
        </div>

        <div className="h-full flex flex-col justify-start items-start gap-[20px] p-4 bg-mainColorLightTransparent rounded-[5px]">
          <span className="font-bold text-[20px] text-white">Govt. IDs</span>
          <div className="flex flex-row justify-start items-center gap-[20px]">
            <span className="w-[130px]">Adhar Number</span>
            <input
              className="p-2 rounded-[5px] outline-none"
              type="text"
              value={formValues.adhar_card_number}
              onChange={({ target: { value } }) =>
                setFormValues({ ...formValues, adhar_card_number: value })
              }
            />
          </div>
          <div className="flex flex-row justify-start items-center gap-[20px]">
            <span className="w-[130px]">Pan Card Number</span>
            <input
              className="p-2 rounded-[5px] outline-none"
              type="text"
              value={formValues.pan_card_number}
              onChange={({ target: { value } }) =>
                setFormValues({ ...formValues, pan_card_number: value })
              }
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-start items-center gap-[20px]">
        <div
          className="px-4 py-2 bg-successGreen text-white rounded-[5px]"
          onClick={() => createTeacher()}
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

export default AddTeacher;
