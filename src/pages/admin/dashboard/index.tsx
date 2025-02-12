import DashboardLayout from "../../../components/layout/Admin/Dashboard";
import protectedRoute from "@/middleware/protectedRoute";

const Dashboard = () => {
  return (
    <>
      <DashboardLayout />
    </>
  );
};

export default protectedRoute(Dashboard, ["admin"]); // Replace "admin" with the appropriate role
