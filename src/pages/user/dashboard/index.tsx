import DashboardLayout from "../../../components/layout/User/Dashboard";
import ProtectedRoute from "@/middleware/protectedroute";

const Dashboard = () => {
  return (
    <>
      <DashboardLayout />
    </>
  );
};

export default ProtectedRoute(Dashboard);
