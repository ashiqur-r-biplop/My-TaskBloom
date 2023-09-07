import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { getUsers } from "../Hook/UseSetUsers";

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const users = getUsers("users");
  console.log(users);
  const currentUser = users?.find((d) => d?.email == user?.email);
  console.log(currentUser);
  return (
    <div className="container mx-auto">
      <h2 className="text-center mt-5 font-semibold lg:text-5xl md:text-3xl text-2xl">
        welcome to my My TaskBloom
      </h2>
      <div className="flex flex-col justify-center items-center mt-20 ps-10">
        <div className="bg-base-100 shadow-xl">
          <figure className="">
            <img
              className="w-1/5 mx-auto rounded-full"
              src={currentUser?.photo}
              alt=""
            />
          </figure>
          <div className="text-center flex flex-col justify-center items-center p-5">
            <h2 className="card-title">{currentUser?.name}</h2>
            <p>{currentUser?.bio}</p>
            <div className="card-actions my-3">
              <button onClick={() => logout()} className="btn">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
