import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRegisterUserMutation } from "../redux/api/userApiSlice";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [addUser, { isError, isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();
  console.log(isError, isLoading);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = {
      fullName: name,
      email,
      password,
    };
    try {
      const resultAction = await addUser(data);
      console.log(resultAction.data);
      if (resultAction.data.statusCode === 200) {
        toast.success("Registration Succesfull");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="h-96 mt-9 flex justify-center items-center">
      <div className="border-2 p-4 shadow-md rounded-md">
        <h1 className="text-2xl">Please Register</h1>
        <hr className="my-2" />
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="email">Full Name</label> <br />
          <input
            className="w-72 mt-1 mb-2 border-2 p-1"
            type="text"
            name="name"
            id="name"
            placeholder="Type Full Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="email">Email</label> <br />
          <input
            className="w-72 mt-1 mb-2 border-2 p-1"
            type="email"
            name="email"
            id="email"
            placeholder="Type Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label> <br />
          <input
            className="w-72 mt-1 mb-2 border-2 p-1"
            type="password"
            name="password"
            id="password"
            placeholder="Type Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button
            type="submit"
            className="bg-indigo-600 text-white p-1 px-2 rounded-md"
          >
            Submit
          </button>
        </form>
        <h1>
          Registered user? Please{" "}
          <Link className="text-green-500" to={"/login"}>
            Login
          </Link>{" "}
        </h1>
      </div>
      <ToastContainer />
    </div>
  );
}
