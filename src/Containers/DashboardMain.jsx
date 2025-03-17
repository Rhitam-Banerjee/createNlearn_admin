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
  const handleFileChange = async (e) => {
    const file = e.target.files;
    if (file) {
      setClassFile(file[0]);
    }
  };

  const submitForm = async () => {
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

  useEffect(() => {
    getAllTeacher();
  }, []);
  return (
    <div className="ml-[200px] w-full h-full min-h-[calc(100vh-60px)]">
      {activePage === "Courses" ? (
        <div className="p-[50px]">
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
              onChange={handleFileChange}
            />
            {classFile && status !== "uploading" && (
              <button onClick={submitForm}>Upload</button>
            )}
          </form>
          {status === "success" && <p className="mb-[20px]">File Uploaded</p>}
          {status === "error" && (
            <p className="mb-[20px]">File Upload Failes</p>
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
