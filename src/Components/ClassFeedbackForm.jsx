import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import urls from "../utils/urls";

const ClassFeedbackForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { classId } = params;
  const [newStudent, setNewStudent] = useState({
    student_id: "",
    student_name: "",
    parent_name: "",
    student_class_number: "",
    attendence: false,
  });
  const [formValues, setFormValues] = useState({
    submited_form_date: "",
    class_id: classId,
    teacher_id: "",
    teacher_name: "",
    class_date: "",
    time_start: "",
    time_end: "",
    class_status: false,
    class_issue: "no_issue",
    class_feedback: "",
    student_feedback: "",
    student_count: 0,
    student_details: [],
  });
  const getClassDetails = async () => {
    try {
      const response = await axios
        .get(`${urls.getClassDetails}?class_id=${formValues.class_id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
      if (response && response.status) {
        const {
          submited_form_date,
          class_id,
          teacher_id,
          teacher_name,
          class_date,
          time_start,
          time_end,
          class_status,
          class_issue,
          class_feedback,
          student_feedback,
          student_count,
          student_details,
        } = response.class;
        setFormValues({
          ...formValues,
          submited_form_date: submited_form_date,
          class_id: class_id,
          teacher_id: teacher_id,
          teacher_name: teacher_name,
          class_date: class_date,
          time_start: time_start,
          time_end: time_end,
          class_status: class_status,
          class_issue: class_issue,
          class_feedback: class_feedback,
          student_feedback: student_feedback,
          student_count: student_count,
          student_details: student_details,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitFormDetails = async () => {
    let formType = "submit";
    if (formValues.class_status) {
      formType = "edit";
    }
    try {
      const response = await axios
        .post(
          `${
            urls.postClassForm
          }?form_type=${formType}&form_details=${JSON.stringify(formValues)}`
        )
        .then((res) => res.data)
        .catch((err) => console.log(err));
      if (response && response.status) {
        setFormValues({
          submited_form_date: "",
          class_id: classId,
          teacher_id: "",
          teacher_name: "",
          class_date: "",
          time_start: "",
          time_end: "",
          class_status: false,
          class_issue: "no_issue",
          class_feedback: "",
          student_feedback: "",
          student_count: 0,
          student_details: [],
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClassDetails();
  }, []);

  return (
    <section className="mt-[100px] p-[50px]">
      {formValues.submited_form_date && (
        <div className="text-secondary font-bold text-[15px] mb-[20px]">
          Form Submited on
          <span className="ml-[20px]">
            {new Date(formValues.submited_form_date).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            })}
          </span>
        </div>
      )}
      <form
        className="text-[15px] bg-unHighlight p-[20px] rounded-[5px] flex flex-col justify-start items-start gap-[20px]"
        onSubmit={(e) => {
          e.preventDefault();
          submitFormDetails();
        }}
      >
        <div className="flex flex-row justify-start items-center">
          <span className="w-[150px] font-bold">Teacher Name</span>
          <span className="bg-lightGrey p-2 font-semibold rounded-[5px] min-w-[200px]">
            {formValues.teacher_name}
          </span>
        </div>
        <div className="flex flex-row justify-start items-center">
          <span className="w-[150px] font-bold">Class ID</span>
          <span className="bg-lightGrey p-2 font-semibold rounded-[5px] min-w-[200px]">
            {formValues.class_id}
          </span>
        </div>
        <div className="flex flex-row justify-start items-center">
          <span className="w-[150px] font-bold">Class Date</span>
          <input
            type="date"
            className="!bg-white p-2 rounded-[5px] font-semibold"
            value={formValues.class_date}
            onChange={({ target: { value } }) =>
              setFormValues({ ...formValues, class_date: value })
            }
          />
        </div>
        <div className="flex flex-row justify-start items-center">
          <span className="w-[150px] font-bold">Time Start</span>
          <input
            type="time"
            className="!bg-white p-2 rounded-[5px] font-semibold"
            placeholder="Name"
            value={formValues.time_start}
            onChange={({ target: { value } }) =>
              setFormValues({ ...formValues, time_start: value })
            }
          />
        </div>
        <div className="flex flex-row justify-start items-center">
          <span className="w-[150px] font-bold">Time End</span>
          <input
            type="time"
            className="!bg-white p-2 rounded-[5px] font-semibold"
            placeholder="Name"
            value={formValues.time_end}
            onChange={({ target: { value } }) =>
              setFormValues({ ...formValues, time_end: value })
            }
          />
        </div>
        <div className="flex flex-row justify-start items-center">
          <span className="w-[150px] font-bold">Class Issue</span>
          <select
            className="!bg-white p-2 rounded-[5px] font-semibold"
            placeholder="Name"
            value={formValues.class_issue}
            onChange={({ target: { value } }) =>
              setFormValues({ ...formValues, class_issue: value })
            }
          >
            <option value="no_issue">No Issue</option>
            <option value="student_issue">Student No show</option>
            <option value="tech_issue">Tech No Show</option>
          </select>
        </div>
        <div className="flex flex-row justify-start items-center">
          <span className="w-[150px] font-bold">Class Feedback</span>
          <textarea
            className="!bg-white p-2 rounded-[5px] font-semibold"
            value={formValues.class_feedback}
            onChange={({ target: { value } }) =>
              setFormValues({ ...formValues, class_feedback: value })
            }
          />
        </div>
        <div className="flex flex-row justify-start items-center">
          <span className="w-[150px] font-bold">Student Feedback</span>
          <textarea
            className="!bg-white p-2 rounded-[5px] font-semibold"
            value={formValues.student_feedback}
            onChange={({ target: { value } }) =>
              setFormValues({ ...formValues, student_feedback: value })
            }
          />
        </div>
        <div className="flex flex-row justify-start items-center">
          <span className="w-[150px] font-bold">Student Count</span>
          <span className="bg-lightGrey p-2 font-semibold rounded-[5px]">
            {formValues.student_count}
          </span>
          <span
            className="ml-[10px] text-[15px] text-white font-semibold bg-secondary p-1 rounded-[5px] cursor-pointer"
            onClick={() =>
              setFormValues({
                ...formValues,
                student_count: formValues.student_count + 1,
              })
            }
          >
            Increase Student Count
          </span>
        </div>
        <span className="font-bold">Student Details</span>
        {formValues.student_details.length > 0 && (
          <div className="bg-unHighlightLight p-[20px] rounded-[5px] text-[12px] flex flex-row justify-start items-start gap-[20px] flex-wrap">
            {formValues.student_details.map((student, index) => {
              return (
                <div
                  key={index}
                  className="p-[20px] bg-lightGrey rounded-[5px] flex flex-col justify-start items-start gap-[10px]"
                >
                  <div className="flex flex-row justify-start items-center">
                    <span className="w-[150px] font-bold">Student ID</span>
                    <span className="!bg-white p-2 rounded-[5px] font-semibold">
                      {student.student_id}
                    </span>
                  </div>
                  <div className="flex flex-row justify-start items-center">
                    <span className="w-[150px] font-bold">Student Name</span>
                    <span className="!bg-white p-2 rounded-[5px] font-semibold">
                      {student.student_name}
                    </span>
                  </div>
                  <div className="flex flex-row justify-start items-center">
                    <span className="w-[150px] font-bold">Parent Name</span>
                    <span className="!bg-white p-2 rounded-[5px] font-semibold">
                      {student.parent_name}
                    </span>
                  </div>
                  <div className="flex flex-row justify-start items-center">
                    <span className="w-[150px] font-bold">Class Number</span>
                    <span className="!bg-white p-2 rounded-[5px] font-semibold">
                      {student.student_class_number}
                    </span>
                  </div>
                  <div className="flex flex-row justify-start items-center">
                    <span className="w-[150px] font-bold">Student Present</span>
                    <span>{student.attendence ? "Present" : "Absent"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {formValues.student_count === 0 && (
          <span className="font-bold text-errorRed">
            No students in this class
          </span>
        )}
        {formValues.student_count > 0 &&
          formValues.student_count >= formValues.student_details.length + 1 && (
            <>
              <div className="bg-unHighlightLight p-[20px] rounded-[5px] text-[12px] ">
                <div className="p-[20px] bg-lightGrey rounded-[5px] flex flex-col justify-start items-start gap-[10px]">
                  <div className="flex flex-row justify-start items-center">
                    <span className="w-[150px] font-bold">Student ID</span>
                    <input
                      className="!bg-white p-2 rounded-[5px] font-semibold"
                      type="text"
                      placeholder="Enter student Id"
                      value={newStudent.student_id}
                      onChange={({ target: { value } }) =>
                        setNewStudent({ ...newStudent, student_id: value })
                      }
                    />
                  </div>
                  <div className="flex flex-row justify-start items-center">
                    <span className="w-[150px] font-bold">Student Name</span>
                    <input
                      className="!bg-white p-2 rounded-[5px] font-semibold"
                      type="text"
                      placeholder="Enter student name"
                      value={newStudent.student_name}
                      onChange={({ target: { value } }) =>
                        setNewStudent({ ...newStudent, student_name: value })
                      }
                    />
                  </div>
                  <div className="flex flex-row justify-start items-center">
                    <span className="w-[150px] font-bold">Parent Name</span>
                    <input
                      className="!bg-white p-2 rounded-[5px] font-semibold"
                      type="text"
                      placeholder="Enter student name"
                      value={newStudent.parent_name}
                      onChange={({ target: { value } }) =>
                        setNewStudent({ ...newStudent, parent_name: value })
                      }
                    />
                  </div>
                  <div className="flex flex-row justify-start items-center">
                    <span className="w-[150px] font-bold">Class Number</span>
                    <input
                      className="!bg-white p-2 rounded-[5px] font-semibold"
                      type="text"
                      placeholder="Enter student class number"
                      value={newStudent.student_class_number}
                      onChange={({ target: { value } }) =>
                        setNewStudent({
                          ...newStudent,
                          student_class_number: value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-row justify-start items-center">
                    <span className="w-[150px] font-bold">Student Present</span>
                    <span
                      className={`${
                        newStudent.attendence
                          ? "bg-successGreen"
                          : "bg-errorRed"
                      } text-white p-1 rounded-[5px] cursor-pointer`}
                      onClick={() =>
                        setNewStudent({
                          ...newStudent,
                          attendence: !newStudent.attendence,
                        })
                      }
                    >
                      {newStudent.attendence ? "Present" : "Absent"}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="text-white bg-secondary p-2 rounded-[5px] font-semibold cursor-pointer"
                onClick={() => {
                  const newStudentDetails = [
                    ...formValues.student_details,
                    newStudent,
                  ];
                  setFormValues({
                    ...formValues,
                    student_details: newStudentDetails,
                  });
                  setNewStudent({
                    student_id: "",
                    student_name: "",
                    parent_name: "",
                    student_class_number: "",
                    attendence: false,
                  });
                }}
              >
                Add
              </div>
            </>
          )}
        {formValues.student_count == formValues.student_details.length && (
          <button
            type="submit"
            className="bg-successGreen p-2 text-white font-bold rounded-[5px] cursor-pointer"
          >
            {formValues.class_status ? "Edit" : "Submit"}
          </button>
        )}
        <small className="text-errorRed font-bold">
          <b>NOTE:</b> Please visit the official google docs for the submition
          of review
        </small>
      </form>
    </section>
  );
};

export default ClassFeedbackForm;
