import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoginUserMutation } from "../redux/api/userApiSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/userSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      const resultAction = await logUser(data);
      if (resultAction.data.statusCode === 200) {
        toast.success(resultAction.data.message);
        localStorage.setItem(
          "access_token",
          resultAction.data.data.accessToken
        );
        dispatch(setUser(data));
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="h-96 m-auto flex justify-center items-center">
      <div className="border-2 p-4 shadow-md rounded-md">
        <h1 className="text-2xl">Please login</h1>
        <hr className="my-2" />
        <form onSubmit={handleFormSubmit}>
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
          New user? Please{" "}
          <Link className="text-green-500" to={"/register"}>
            Signup
          </Link>{" "}
        </h1>
      </div>
      <ToastContainer />
    </div>
  );
}
