import { Link } from "react-router-dom";
import Comment from "../components/Comment";

import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className=" flex justify-center content-center">
      <div>
        <h1 className=" mt-4 mb-2 text-2xl font-semibold">
          Welcome to Techzu Busniess World!!
        </h1>
        <img width={500} src="/img/techzu.jpg" alt="" />

        {!user ? (
          <h1 className="mt-2 mb-2 text-lg">
            Want to write your thought? Please{" "}
            <Link className="text-green-500" to={"/login"}>
              {" "}
              Login
            </Link>
          </h1>
        ) : null}

        <Comment />
      </div>
    </div>
  );
}
