import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const RegisPage = () => {
    const router = useRouter();
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //     axios
  //     .get(
  //         "endpoint"
  //     )
  //     .then((response) => {
  //         setUsers(response.data);
  //     })
  //     .catch((error) => {
  //         console.error("Error fetching data:", error);
  //     })
  // }, []);

  return (
    <div className=" flex justify-center items-center bg-cover">
      <img src="/regis-ilustration.svg" className="w-[88vh] mr-40" />
      <div className="text-olive border-beige border rounded-md p-8 shadow-2xl backdrop-filter backdrop-blur-sm bg-opacity-40 relative ">
        <h1 className="font-bold text-4xl text-center mb-6">Daftar Akun</h1>
        <div>
          <div className="relative my-4">
            <label htmlFor="">Email</label>
            <input
              type="email"
              className="mt-2 block w-72 py-2.3 px-0 text-sm bg-transparent border-0 border-b border-beige appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus-text-black focus-border-blue-600 peer"
            />
          </div>
          <div className="relative my-4">
            <label htmlFor="">Username</label>
            <input
              type="text"
              className="mt-2 block w-72 py-2.3 px-0 text-sm bg-transparent border-0 border-b border-beige appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus-text-black focus-border-blue-600 peer"
            />
          </div>
          <div className="relative my-4">
            <label htmlFor="">Password </label>
            <input
              type="password"
              className="mt-2 block w-72 py-2.3 px-0 text-sm bg-transparent border-0 border-b border-beige appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus-text-black focus-border-blue-600 peer"
            />
          </div>
          <div className="relative my-4">
            <label htmlFor="">Confirm Password </label>
            <input
              type="password"
              className="mt-2 block w-72 py-2.3 px-0 text-sm bg-transparent border-0 border-b border-beige appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus-text-black focus-border-blue-600 peer"
            />
          </div>
          <button
            onClick={() => router.push("/User/Login")}
            className="mt-2 bg-olive font-medium text-white text-center w-full px-2 py-2 rounded-md"
          >
            Daftar
          </button>
          <div className="flex flex-row text-sm item-center text-center justify-center mt-4">
            <p>Apakah sudah punya akun?</p>
            <Link href="/User/Login" className="font-semibold">
              Masuk disini!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisPage;
