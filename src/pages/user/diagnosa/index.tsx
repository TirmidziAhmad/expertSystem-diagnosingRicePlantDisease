import DiagnosaLayout from "../../../components/layout/User/Diagnosa";
import ProtectedRoute from "@/middleware/protectedroute";

const Diagnosa = () => {
  return (
    <>
      <DiagnosaLayout />
    </>
  );
};

export default ProtectedRoute(Diagnosa);
