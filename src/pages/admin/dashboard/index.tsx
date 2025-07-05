import DashboardLayout from "../../../components/layout/Admin/Dashboard";
import protectedRoute from "@/middleware/ProtectedRoute";

const Dashboard = () => {
  return (
    <>
      <DashboardLayout />
    </>
  );
};

export default protectedRoute(Dashboard, ["admin"]);
