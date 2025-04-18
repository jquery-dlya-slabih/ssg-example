import { Outlet } from 'react-router';

import { HTML_DIVIDER } from '@/constants.ts';

const Layout = () => (
  <>
    {import.meta.env.SSR && HTML_DIVIDER}
    <header className="p-20 text-center">THIS IS TOPLINE</header>
    <Outlet />
    <footer className="p-20 text-center">THIS IS FOOTER</footer>
  </>
);

export default Layout;
