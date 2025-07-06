import DashboardLayout from "../../../components/layout/Admin/Dashboard";
import protectedRoute from "@/middleware/protectedroute";

const Dashboard = () => {
  return (
    <>
      <DashboardLayout />
    </>
  );
};

export default protectedRoute(Dashboard, ["admin"]);
