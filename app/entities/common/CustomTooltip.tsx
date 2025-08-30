const CustomTooltip = ({
  active,
  payload,
  label,
  unit = "만원",
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
  unit?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 px-3 py-2 rounded-lg shadow-lg border border-gray-200">
        <p className="text-xs text-text-secondary mb-1">{label}</p>
        <p className="text-sm font-semibold text-text-primary">
          {`${payload[0].value.toLocaleString()}${unit}`}
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
