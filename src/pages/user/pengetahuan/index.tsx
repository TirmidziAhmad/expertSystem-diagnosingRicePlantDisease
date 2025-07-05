import PengetahuanLayout from "../../../components/layout/User/Pengetahuan";
import protectedRoute from "@/middleware/ProtectedRoute";
const Pengetahuan = () => {
  return (
    <>
      <PengetahuanLayout />
    </>
  );
};

export default protectedRoute(Pengetahuan, ["user"]);
