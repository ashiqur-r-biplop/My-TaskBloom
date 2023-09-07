import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Main = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="overflow-x-hidden">
      <div>
        <div className="md:min-h-[calc(100vh-73px)]">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Main;
