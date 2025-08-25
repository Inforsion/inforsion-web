const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 px-3 py-2 rounded-lg shadow-lg border border-gray-200">
        <p className="text-xs text-text-secondary mb-1">{label}</p>
        <p className="text-sm font-semibold text-text-primary">
          {`${payload[0].value.toLocaleString()}만원`}
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
