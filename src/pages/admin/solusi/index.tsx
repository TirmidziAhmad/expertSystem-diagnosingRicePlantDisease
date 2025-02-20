import SolusiLayout from "../../../components/layout/Admin/Solusi";
import protectedRoute from "@/middleware/protectedRoute";

const Solusi = () => {
  return <SolusiLayout />;
};

export default protectedRoute(Solusi, ["admin"]);
