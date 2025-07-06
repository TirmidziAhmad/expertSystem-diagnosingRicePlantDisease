import HasilDiagnosaa from "../../../components/layout/User/HasilDiagnosaa";
import protectedRoute from "@/middleware/protectedroute";
const HasilDiagnosa = () => {
  return (
    <>
      <HasilDiagnosaa />
    </>
  );
};

export default protectedRoute(HasilDiagnosa, ["user"]);
