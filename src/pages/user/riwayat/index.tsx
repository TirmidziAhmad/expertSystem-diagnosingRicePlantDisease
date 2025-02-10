import RiwayatLayout from '../../../components/layout/User/Riwayat';
import ProtectedRoute from '@/middleware/protectedroute';
const Riwayat = () => {
  return (
    <>
      <RiwayatLayout />
    </>
  );
};

export default ProtectedRoute(Riwayat);
