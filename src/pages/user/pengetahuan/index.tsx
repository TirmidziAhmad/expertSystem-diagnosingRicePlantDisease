import PengetahuanLayout from "../../../components/layout/User/Pengetahuan";
import protectedRoute from "@/middleware/protectedRoute";
const Pengetahuan = () => {
  return (
    <>
      <PengetahuanLayout />
    </>
  );
};

export default protectedRoute(Pengetahuan, ["user"]);
