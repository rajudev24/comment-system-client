import { Link } from "react-router-dom";
import Comment from "../components/Comment";
import { useState } from "react";

export default function Home() {
  const [isLogin, setLogin] = useState(false);
  console.log(setLogin);
  return (
    <div className=" flex justify-center content-center">
      <div>
        <h1 className=" mt-4 mb-2 text-2xl font-semibold">
          Welcome to Techzu Busniess World!!
        </h1>
        <img width={500} src="/img/techzu.jpg" alt="" />
        {isLogin ? (
          <Comment />
        ) : (
          <h1 className="mt-2 text-lg">
            Want to write your thought? Please{" "}
            <Link className="text-green-500" to={"/login"}>
              {" "}
              Login
            </Link>
          </h1>
        )}
      </div>
    </div>
  );
}
