import HasilDiagnosaa from "../../../components/layout/User/HasilDiagnosaa";
import protectedRoute from "@/middleware/ProtectedRoute";
const HasilDiagnosa = () => {
  return (
    <>
      <HasilDiagnosaa />
    </>
  );
};

export default protectedRoute(HasilDiagnosa, ["user"]);
