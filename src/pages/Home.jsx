import { Link } from "react-router";
import { useGetCurrentUserQuery } from "../services/auth";

const Home = () => {
  const { data, isSuccess } = useGetCurrentUserQuery();

  return (
    <>
      <div className="p-4">
        {isSuccess && (
          <h1 className="text-2xl text-blue-400 font-bold">
            Hi! {data.firstName}
          </h1>
        )}
        {isSuccess ? (
          <></>
        ) : (
          <div>
            <Link to="register">
              <button className="border-2 mr-2 w-20 rounded-xl p-1 bg-blue-400 text-white cursor-pointer">
                Sign In
              </button>
            </Link>
            <Link to="/login">
              <button className="border-2 rounded-xl p-1 bg-blue-400 text-white w-20 cursor-pointer">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
export default Home;
