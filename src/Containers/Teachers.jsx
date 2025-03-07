import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import urls from "../utils/urls";

const Teachers = () => {
  const { allTeachers } = useSelector((store) => store.details);
  const [overLay, setOverLay] = useState(false);
  const [activeTeacher, setActiveTeacher] = useState("");
  const [activeTab, setActiveTab] = useState("Opted");
  const [activeSlot, setActiveSlot] = useState("opted_slots");
  const [allSlots, setAllSlots] = useState({
    class_slots: {},
    free_slots: {},
    opted_slots: {},
  });

  const getTeacherSlots = async (teacherId, daySelect) => {
    try {
      const response = await axios
        .get(
          `${urls.getTeacherSlots}?teacher_id=${teacherId}&duration=${daySelect}`
        )
        .then((res) => res.data)
        .catch((err) => console.log(err));
      setAllSlots({
        class_slots: response.class_slots,
        free_slots: response.free_slots,
        opted_slots: response.opted_slots,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAllSlots({
      class_slots: {},
      free_slots: {},
      opted_slots: {},
    });
  }, []);

  return (
    <div className="relative flex flex-col gap-[10px] p-[50px]">
      <span className="text-[20px] font-bold pb-[10px]">All Teachers</span>
      <Link
        to={"/add-teacher"}
        className="py-2 px-3 bg-mainColor font-semibold !text-white w-max rounded-[5px] cursor-pointer"
      >
        Add teacher
      </Link>
      {overLay && (
        <div className="absolute top-0 left-0 w-full m-auto h-full max-h-[100vh] backdrop-blur-sm flex flex-col justify-start items-start p-[50px]">
          <span className="text-[20px] font-bold my-[20px]">
            {activeTeacher}
          </span>
          <div className="flex flex-row justify-start items-center gap-[5px]">
            {["Opted", "Class", "Free"].map((tabHeader, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    activeTab === tabHeader
                      ? "bg-mainColorLight text-mainColor"
                      : "bg-white"
                  } px-6 py-1 rounded-[5px] font-black rounded-b-[0px] cursor-pointer`}
                  onClick={() => {
                    setActiveTab(tabHeader);
                    if (tabHeader === "Opted") setActiveSlot("opted_slots");
                    else if (tabHeader === "Class")
                      setActiveSlot("class_slots");
                    else setActiveSlot("free_slots");
                  }}
                >
                  {tabHeader}
                </div>
              );
            })}
          </div>
          <div className="w-full h-full flex-1 bg-mainColorLight flex flex-col gap-[10px] p-[30px]">
            {Object.entries(allSlots[activeSlot]).map(
              ([heading, slots], index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row justify-start items-center gap-[10px] bg-unHighlight p-2"
                  >
                    <div className="font-bold text-white p-2 rounded-[5px] bg-mainColor">
                      {heading}
                    </div>
                    {slots.map((slot, index) => {
                      return (
                        <div
                          key={index}
                          className="font-bold text-[15px] text-white p-1 px-2 rounded-[5px] bg-secondary"
                        >
                          {slot.start} - {slot.end}
                        </div>
                      );
                    })}
                  </div>
                );
              }
            )}
          </div>
          <div
            className="my-[30px] ml-auto p-2 rounded-[5px] bg-errorRed text-white font-bold cursor-pointer"
            onClick={() => {
              setActiveTab("Opted");
              setActiveSlot("opted_slots");
              setActiveTeacher("");
              setOverLay(false);
              setAllSlots({
                class_slots: {},
                free_slots: {},
                opted_slots: {},
              });
            }}
          >
            Close
          </div>
        </div>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-secondary ">
              <TableCell className="!text-[15px] !text-white !font-bold">
                Id
              </TableCell>
              <TableCell
                align="right"
                className="!text-[15px] !text-white !font-bold"
              >
                Name
              </TableCell>
              <TableCell
                align="right"
                className="!text-[15px] !text-white !font-bold"
              >
                Mobile number
              </TableCell>
              <TableCell
                align="right"
                className="!text-[15px] !text-white !font-bold"
              >
                DOB
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allTeachers.map((row, index) => (
              <TableRow
                key={row.index}
                className={`${
                  index % 2 == 0 ? "bg-mainColorTransparent" : ""
                } hover:!bg-secondary cursor-pointer ${
                  overLay ? "pointer-events-none" : "pointer-events-auto"
                }`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => {
                  setActiveTeacher(row.name);
                  setOverLay(true);
                  getTeacherSlots(row.id);
                  window.scrollTo({ top: 0, left: 0 });
                }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell className="!font-semibold" align="right">
                  {row.name}
                </TableCell>
                <TableCell className="!font-semibold" align="right">
                  {row.mobile_number}
                </TableCell>
                <TableCell className="!font-semibold" align="right">
                  {row.dob}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Teachers;
