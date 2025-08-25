import { Suspense } from "react";
import ChartLoadingBox from "@/app/entities/common/loading/ChartLoadingBox";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<ChartLoadingBox />}>{children}</Suspense>;
};

export default Layout;
