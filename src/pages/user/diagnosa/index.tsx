import protectedRoute from "@/middleware/ProtectedRoute";
import DiagnosaLayout from "../../../components/layout/User/Diagnosa";

const Diagnosa = () => {
  return (
    <>
      <DiagnosaLayout />
    </>
  );
};

export default protectedRoute(Diagnosa, ["user"]);
