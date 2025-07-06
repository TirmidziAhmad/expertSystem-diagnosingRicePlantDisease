import TentangLayout from "../../../components/layout/User/Tentang";
import protectedRoute from "@/middleware/protectedroute";
const Tentang = () => {
  return (
    <>
      <TentangLayout />
    </>
  );
};

export default protectedRoute(Tentang, ["user"]);
