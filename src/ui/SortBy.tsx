import { useSearchParams } from "react-router-dom";

function SortBy({
  options,
}: {
  options: Array<{ value: string; label: string }>;
}) {
  const [searchParams, setsearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setsearchParams(searchParams);
  }
  return (
    <Select
      type="white"
      options={options}
      value={sortBy}
      onChange={handleChange}
    />
  );
}
export default SortBy;

interface SelectProps {
  options: Array<{ value: string; label: string }>;
  value?: string;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
function Select({ options, value, onChange }: SelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="rounded-xl p-3 text-xs md:p-4 md:text-base"
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
