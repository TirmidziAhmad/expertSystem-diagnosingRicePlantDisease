import RiwayatLayout from "../../../components/layout/User/Riwayat";
import protectedRoute from "@/middleware/ProtectedRoute";
const Riwayat = () => {
  return (
    <>
      <RiwayatLayout />
    </>
  );
};

export default protectedRoute(Riwayat, ["user"]);
