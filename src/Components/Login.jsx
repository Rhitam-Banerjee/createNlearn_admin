import { useState } from "react";
import { FaUserCircle, FaWhatsapp } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import urls from "../utils/urls";
import { useDispatch } from "react-redux";
import { setAdmin } from "../reducers/adminSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [userDetail, setUserDetail] = useState({
    mobile: "",
    password: "",
    isAdmin: false,
  });

  const handleLogin = async () => {
    try {
      const response = await axios
        .post(
          `${urls.login}?mobile=${userDetail.mobile}&password=${userDetail.password}&is_admin=${userDetail.isAdmin}`
        )
        .then((res) => res.data)
        .catch((err) => console.log(err));
      if (response && response.status) {
        dispatch(setAdmin(response.user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-purple-200 flex flex-col justify-center items-center w-full mx-auto max-w-[330px] font-bold text-center p-4 rounded-[5px]">
      <div className="flex flex-col justify-center items-center gap-[10px]">
        <FaUserCircle className="w-[27px] h-[27px]" alt="User Icon" />
        <p className="text-[15px]">LogIn</p>
      </div>
      <form className="mt-[20px] flex flex-col justify-start items-start rounded-[5px] p-[20px] gap-[15px]">
        <div className="flex flex-col items-start justify-start gap-[5px]">
          <label htmlFor="mobileNumber">
            <span className="flex flex-row items-center text-[13px] ">
              <FaWhatsapp className="w-[13px] mr-[5px]" alt="WhatsApp" />
              Mobile Number
            </span>
          </label>
          <input
            className="w-[283px] h-[29px] text-[13px] p-[5px] rounded-[5px]"
            style={{
              border: "1px solid #3B72FF",
            }}
            id="mobileNumber"
            type="text"
            maxLength={10}
            value={userDetail.mobile}
            onChange={({ target: { value } }) => {
              if (value.match(/^[0-9]*$/)) {
                setUserDetail({ ...userDetail, mobile: value });
              }
            }}
          />
        </div>
        <div className="flex flex-col items-start justify-start gap-[5px]">
          <label htmlFor="password">
            <span className="flex flex-row items-center text-[13px] ">
              <MdOutlinePassword className="w-[13px] mr-[5px]" alt="Password" />
              Password
            </span>
          </label>
          <div className="relative">
            <input
              className="w-[283px] h-[29px] text-[13px] p-[5px] rounded-[5px]"
              id="password"
              value={userDetail.password}
              style={{
                border: "1px solid #3B72FF",
              }}
              type={showPassword ? "text" : "password"}
              onChange={({ target: { value } }) =>
                setUserDetail({ ...userDetail, password: value })
              }
              autoComplete="new-password"
            />
            {showPassword ? (
              <AiFillEye
                className="absolute top-1/2 -translate-y-1/2 right-[10px] h-full w-[14px] text-[14px] "
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <AiFillEyeInvisible
                className="absolute top-1/2 -translate-y-1/2 right-[10px] h-full w-[14px] text-[14px] "
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          <div className="ml-auto w-1/2 flex flex-row justify-end items-center gap-[10px]">
            <input
              className=""
              type="checkbox"
              value={userDetail.isAdmin}
              onChange={() =>
                setUserDetail({ ...userDetail, isAdmin: !userDetail.isAdmin })
              }
            />
            <span className="text-[12px] font-bold">Is Admin</span>
          </div>
        </div>
        <button
          type="submit"
          className="mt-[20px] flex flex-row justify-center items-center gap-[10px] max-w-[110px] w-full mx-auto p-[10px] text-white bg-amber-600 text-[12px] bg-secondary rounded-[5px] cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <span>Login</span>
        </button>
      </form>
    </section>
  );
};

export default Login;
