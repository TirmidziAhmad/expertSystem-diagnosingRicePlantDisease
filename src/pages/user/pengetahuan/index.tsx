import PengetahuanLayout from "../../../components/layout/User/Pengetahuan";
import protectedRoute from "@/middleware/protectedroute";
const Pengetahuan = () => {
  return (
    <>
      <PengetahuanLayout />
    </>
  );
};

export default protectedRoute(Pengetahuan, ["user"]);
