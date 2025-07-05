import DashboardLayout from "../../../components/layout/User/Dashboard";
import protectedRoute from "../../../middleware/ProtectedRoute";

const Dashboard = () => {
  return <DashboardLayout />;
};

export default protectedRoute(Dashboard, ["user"]);
