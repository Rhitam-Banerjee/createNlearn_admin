import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import urls from "../utils/urls";
const AddTeacher = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    password: "",
    mobile_number: "",
    alternate_number: "",
    english_fluency: "",
    meeting_fluency: "",
    address: "",
    dob: "",
    linkedin_id: "",
    cv_link: "",
    adhar_card_number: "",
    pan_card_number: "",
  });

  const createTeacher = async () => {
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
      english_fluency: "",
      meeting_fluency: "",
      address: "",
      dob: "",
      linkedin_id: "",
      cv_link: "",
      adhar_card_number: "",
      pan_card_number: "",
    });
  }, []);
  return (
    <div className="mt-[100px] p-6 flex flex-col justify-start items-start gap-[30px] text-[15px] font-semibold bg-unHighlight">
      <span className="text-[20px] font-bold">Add Teacher Details</span>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[200px]">Name</span>
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
        <span className="w-[200px]">Mobile Number</span>
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
        <span className="w-[200px]">Alternate Number</span>
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
        <span className="w-[200px]">Password</span>
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
        <span className="w-[200px]">English Fluency</span>
        <input
          className="p-2 rounded-[5px] outline-none"
          type="number"
          value={formValues.english_fluency}
          onChange={({ target: { value } }) =>
            setFormValues({ ...formValues, english_fluency: value })
          }
        />
      </div>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[200px]">Meeting Fluency</span>
        <input
          className="p-2 rounded-[5px] outline-none"
          type="number"
          value={formValues.meeting_fluency}
          onChange={({ target: { value } }) =>
            setFormValues({ ...formValues, meeting_fluency: value })
          }
        />
      </div>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[200px]">Address</span>
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
        <span className="w-[200px]">DOB</span>
        <input
          className="p-2 rounded-[5px] outline-none"
          type="date"
          value={formValues.dob}
          onChange={({ target: { value } }) =>
            setFormValues({ ...formValues, dob: value })
          }
        />
      </div>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[200px]">Linked In</span>
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
        <span className="w-[200px]">CV Link</span>
        <input
          className="p-2 rounded-[5px] outline-none"
          type="date"
          value={formValues.cv_link}
          onChange={({ target: { value } }) =>
            setFormValues({ ...formValues, cv_link: value })
          }
        />
      </div>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="w-[200px]">Adhar Number</span>
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
        <span className="w-[200px]">Pan Card Number</span>
        <input
          className="p-2 rounded-[5px] outline-none"
          type="text"
          value={formValues.pan_card_number}
          onChange={({ target: { value } }) =>
            setFormValues({ ...formValues, pan_card_number: value })
          }
        />
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
