import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

type MenuItem = {
  name: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const useActiveMenu = (menuItems: MenuItem[]) => {
  const [activeMenu, setActiveMenu] = useState<string>('Dashboard');
  const router = useRouter();

  useEffect(() => {
    const currentRoute = router.pathname;
    const currentItem = menuItems.find((item) => item.href === currentRoute);
    if (currentItem) {
      setActiveMenu(currentItem.name);
    }
  }, [router.pathname, menuItems]);

  return activeMenu;
};

export default useActiveMenu;
