import Filter from "../../ui/Filter";

export default function DashboardFilter() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-blue-600 ">
      <h1 className=" ml-5 hidden text-xs font-bold uppercase md:block md:text-3xl">
        Trang tổng hợp
      </h1>
      <div className="">
        <Filter
          filterField="last"
          options={[
            { value: "7", label: "7 ngày gần nhất" },
            { value: "30", label: "30 ngày gần nhất" },
            { value: "90", label: "90 ngày gần nhất" },
          ]}
        />
      </div>
    </div>
  );
}
