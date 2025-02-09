import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FaViruses } from "react-icons/fa";
import { MdCoronavirus } from "react-icons/md";
import { AiOutlineBranches } from "react-icons/ai";
import useActiveMenu from "./UseActiveMenu";
import Image from "next/image";

type MenuItem = {
  name: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const SidebarAdmin: React.FC = () => {
  const menuItems: MenuItem[] = [
    { name: "Dashboard", href: "/admin/dashboard", icon: FaHome },
    { name: "Gejala", href: "/admin/gejala", icon: FaViruses },
    { name: "Penyakit", href: "/admin/penyakit", icon: MdCoronavirus },
    { name: "Relasi", href: "/admin/relasi", icon: AiOutlineBranches },
  ];

  const activeMenu = useActiveMenu(menuItems);

  return (
    <aside className="fixed w-64 h-full bg-white shadow-md shadow-dark py-2 px-6">
      <div className="flex justify-center text-center items-center py-4 border-b border-dark mb-4">
        <Link href="/" className="flex items-center text-olive">
          <Image src="/logo.svg" alt="icon" width={28} height={28} />
          <span className="text-xl font-bold ml-2">ESRDP</span>
        </Link>
      </div>
      <nav className="space-y-4">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} className={`group flex items-center group-hover:text-olive  ${activeMenu === item.name ? "text-olive" : "text-black"}`}>
            <item.icon className={`w-5 h-5  group-hover:text-olive ${activeMenu === item.name ? "text-olive" : "text-black"}`} />
            <span className="ml-4 group-hover:text-olive">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarAdmin;
