import { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      toast.success("Success Notification !", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(data); // Handle the response from the API here
    } catch (error) {
      console.error("Error:", error);
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
