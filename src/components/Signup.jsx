import { Eye } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await Axios.post(
        "http://localhost:4002/api/v1/user/signup",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );
      alert(data.message || "Signup Succeded");
      navigate("/login");
    } catch (error) {
      const msg = error?.response?.data?.errors || "Signup Failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="  w-full max-w-md rounded-2xl p-6 shadow-lg">
        {/* heading */}
        <h1 className=" items-center justify-center text-center">Signup</h1>

        {/* firstName */}

        <div className="mb-4 mt-2">
          <input
            className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0] "
            type="text"
            name="firstName"
            placeholder="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        {/* lastName */}
        <div className="mb-4 mt-2">
          <input
            className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0] "
            type="text"
            name="lastName"
            placeholder="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        {/* email */}
        <div className="mb-4 mt-2">
          <input
            className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0] "
            type="text"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* password */}
        <div className="mb-4 mt-2 relative">
          <input
            className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:ring-2  focus:ring-[#7a6ff0] "
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
          />
          <span className="absolute right-3 top-3 text-gray-400">
            <Eye size={18} />
          </span>
        </div>

        {/* error msg */}
        {error && <span className="text-red-600 text-sm mb-4">{error}</span>}

        {/* term condition */}
        <p className="text-xs text-gray-400 mt-4 mb-6">
          By signing up or logging in, you consent to book-library
          <a href="" className="underline">
            Terms of Use
          </a>
          and
          <a href="" className="underline">
            Privacy Policy
          </a>
          .
        </p>

        {/* signup button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-[#7a6ff6] hover:bg-[#6c61a6] text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Signing... " : " Signup"}
        </button>

        {/* links */}
        <div className="flex justify-between mt-4 text-sm">
          <a className="text-[#7a6ff6] hover:underline" href="">
            Already Register
          </a>
          <Link className="text-[#7a6ff6] hover:underline" to={"/Login"}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
