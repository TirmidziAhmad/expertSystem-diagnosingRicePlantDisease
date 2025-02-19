import SidebarAdmin from "../../../fragments/SidebarAdmin";
import Navbar from "../../../fragments/Navbar";
import Footer from "../../../fragments/Footer";
import CardTotal from "../../../fragments/CardTotal";
import Hero from "../../../fragments/Hero";
const DashboardLayout: React.FC = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <SidebarAdmin />
        <main className="flex-1 p-6 sm:ml-[260px]">
          <Navbar title="Overview Dashboard" />
          <section className="mt-4">
            <Hero title={"Hi, " + "Admin"} subtitle="Selamat datang di Sistem Pakar Diagnosa Penyakit Pada Tanaman Padi" imageSrc="/image.svg" />
            <div className="flex flex-col sm:flex-row gap-4 mt-3">
              <CardTotal />
            </div>
          </section>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
