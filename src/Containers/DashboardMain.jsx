/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ClassGrid, CourseGrid, Teachers } from "./";
import axios from "axios";
import urls from "../utils/urls";
import { setAllTeachers } from "../reducers/detailSlice";
import { useEffect, useState } from "react";

const DashboardMain = () => {
  const dispatch = useDispatch();
  const { activePage } = useSelector((store) => store.admin);
  const { allCourses } = useSelector((store) => store.details);

  const [classFile, setClassFile] = useState(null);
  const [teacherClass, setTeacherClass] = useState(null);
  const [status, setStatus] = useState("idle");

  const getAllTeacher = async () => {
    const response = await axios
      .get(`${urls.getAllTeachers}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    if (response && response.status) {
      dispatch(setAllTeachers(response.teachers));
    }
  };
  const handleClassCSV = async (e) => {
    const file = e.target.files;
    if (file) {
      setClassFile(file[0]);
    }
  };
  const handleTeacherCSV = async (e) => {
    const file = e.target.files;
    if (file) {
      setTeacherClass(file[0]);
    }
  };

  const submitClassForm = async () => {
    if (!classFile) return;
    setStatus("uploading");
    const formData = new FormData();
    formData.append("file", classFile);

    try {
      const response = await axios
        .post(`${urls.postClassFile}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data)
        .catch((err) => console.log(err));
      setStatus("success");
    } catch (error) {
      setStatus("error");
      console.log(error);
    }
  };
  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };
  const submitTeacherForm = async () => {
    if (!teacherClass) return;
    setStatus("uploading");
    const formData = new FormData();
    formData.append("file", teacherClass);

    try {
      const response = await axios
        .post(`${urls.postTeacherFile}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data)
        .catch((err) => console.log(err));
      if (response && response.status) {
        let headers = ["number,teacher,class_name,class_start"];
        let usersCSV = response.users.reduce((acc, user) => {
          const { number, teacher, class_name, class_start } = user;
          acc.push([number, teacher, class_name, class_start].join(","));
          return acc;
        }, []);
        downloadFile({
          data: [...headers, ...usersCSV].join("\n"),
          fileName: "users_details.csv",
          fileType: "text/csv",
        });
      }
      setStatus("success");
    } catch (error) {
      setStatus("error");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTeacher();
  }, []);
  return (
    <div className="ml-[200px] w-full h-full min-h-[calc(100vh-60px)]">
      {activePage === "Courses" ? (
        <div className="p-[50px]">
          <div>
            <form
              className="mb-[10px] flex flex-row w-full justify-end items-center gap-[20px]"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="ml-auto">Upload Classes</div>
              <input
                className="p-2 rounded-[5px]"
                type="file"
                onChange={handleClassCSV}
              />
              {classFile && status !== "uploading" && (
                <button onClick={submitClassForm}>Upload</button>
              )}
            </form>
            <form
              className="mb-[10px] flex flex-row w-full justify-end items-center gap-[20px]"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="ml-auto">Convert Teacher Class</div>
              <input
                className="p-2 rounded-[5px]"
                type="file"
                onChange={handleTeacherCSV}
              />
              {teacherClass && status !== "uploading" && (
                <button onClick={submitTeacherForm}>Upload</button>
              )}
            </form>
          </div>
          {status === "success" && <p className="mb-[20px]">File Uploaded</p>}
          {status === "error" && (
            <p className="mb-[20px]">File Upload Failed</p>
          )}
          <CourseGrid courses={allCourses} />
          <ClassGrid />
        </div>
      ) : (
        <Teachers />
      )}
    </div>
  );
};

export default DashboardMain;
