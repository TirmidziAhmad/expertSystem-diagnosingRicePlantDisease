import Link from "next/link";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center bg-cover">
      <div className="text-olive border-beige border rounded-md p-8 shadow-2xl backdrop-filter backdrop-blur-sm bg-opacity-40 relative ">
        <h1 className="font-bold text-4xl text-center mb-6">Masuk</h1>
        <div>
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
          <button
            onClick={() => router.push("/")}
            className="mt-2 bg-olive font-medium text-white text-center w-full px-2 py-2 rounded-md"
          >
            Masuk
          </button>
          <div className="flex flex-row text-sm item-center text-center justify-center mt-4">
            <p>Apakah belum punya akun?</p>
            <p className="font-semibold">
              <Link href="/User/Regis">Daftar disini!</Link>
            </p>
          </div>
        </div>
      </div>
      <img src="/login-ilustration.jpg" className="w-[140vh] mt-5" />
    </div>
  );
};

export default LoginPage;
