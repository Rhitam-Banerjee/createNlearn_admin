import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Teachers = () => {
  const { allTeachers } = useSelector((store) => store.details);
  return (
    <div className="flex flex-col gap-[10px]">
      <span className="text-[20px] font-bold pb-[10px]">All Teachers</span>
      <Link
        to={"/add-teacher"}
        className="py-2 px-3 bg-mainColor font-semibold !text-white w-max rounded-[5px] cursor-pointer"
      >
        Add teacher
      </Link>
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
                key={row.name}
                className={`${
                  index % 2 == 0 ? "bg-mainColorTransparent" : ""
                } hover:!bg-secondary cursor-pointer`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
