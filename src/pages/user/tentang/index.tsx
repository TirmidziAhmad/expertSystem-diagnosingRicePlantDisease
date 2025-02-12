import TentangLayout from "../../../components/layout/User/Tentang";
import protectedRoute from "@/middleware/protectedRoute";
const Tentang = () => {
  return (
    <>
      <TentangLayout />
    </>
  );
};

export default protectedRoute(Tentang, ["user"]);
