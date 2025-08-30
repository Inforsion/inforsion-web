import { TriangleAlert } from "lucide-react";

const ErrorBox = () => {
  return (
    <div className={"chart-container flex items-center justify-center h-64"}>
      <div className={"text-red-400 inline-flex gap-2 items-center"}>
        <TriangleAlert />
        매출 데이터가 올바르지 않습니다. 다시 시도해주세요.
      </div>
    </div>
  );
};
export default ErrorBox;
