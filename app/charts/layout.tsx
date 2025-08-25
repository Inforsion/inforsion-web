import { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<div>차트를 불러오는 중...</div>}>{children}</Suspense>
  );
};

export default Layout;
