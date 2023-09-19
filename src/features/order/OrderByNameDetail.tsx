import { formatCurrencyNumber } from "../../helper/helperFunctions";
import Heading from "../../ui/Heading";

export const OrderByNameDetail = ({ items }: { items: any }) => {
  return (
    <div className="relative max-h-[400px] overflow-y-auto border-b-2 border-blue-700  md:w-max">
      <div className=" sticky top-0 grid grid-cols-orderDetailTable_small items-center border-2 border-b-0 border-blue-700 bg-blue-300 p-1  md:grid-cols-orderDetailTable ">
        {rowLabel_max.map((item, index) => (
          <div key={index} className="hidden md:block ">
            <Heading
              addStyle={`w-full text-sm md:text-lg text-center`}
              key={item.id}
              type="sub"
            >
              {item.label}
            </Heading>
          </div>
        ))}
        {rowLabel_min.map((item, index) => (
          <div key={index} className="block md:hidden ">
            <Heading
              addStyle={`w-full text-sm md:text-lg text-center`}
              key={item.id}
              type="sub"
            >
              {item.label}
            </Heading>
          </div>
        ))}
      </div>

      {items.map((item: any, index: number) => (
        <div
          key={index}
          className={`grid grid-cols-orderDetailTable_small items-center border-blue-700  md:grid-cols-orderDetailTable ${
            index % 2 ? " border-x-2 bg-gray-200" : " border-2  bg-white"
          } `}
        >
          <Heading
            addStyle="w-full hidden md:flex text-sm md:text-lg h-full flex flex-col items-center justify-center text-center"
            type="sub"
          >
            {index + 1}
          </Heading>
          <Heading
            addStyle="w-full text-sm md:text-lg h-full flex flex-col items-center justify-center text-center"
            type="sub"
          >
            <p>{item.name}</p>
            {(item.ice_level !== null || item.sugar_level !== null) && (
              <div className="text-xs md:text-sm">
                <span>Đường:{item.sugar_level}%,</span>
                <span>Đá:{item.ice_level}%</span>
              </div>
            )}
          </Heading>

          <Heading
            addStyle="w-full text-sm md:text-lg h-full flex flex-col items-center justify-center text-center"
            type="sub"
          >
            {item.quantity}
          </Heading>
          <Heading
            addStyle="w-full text-sm md:text-lg h-full flex flex-col items-center justify-center text-center"
            type="sub"
          >
            {item.price}
          </Heading>
          <Heading
            addStyle="w-full text-sm md:text-lg h-full flex flex-col items-center justify-center text-center"
            type="sub"
          >
            {formatCurrencyNumber((item.quantity * item.price).toString())}
          </Heading>
        </div>
      ))}
    </div>
  );
};
const rowLabel_max = [
  { id: 1, label: "stt" },
  { id: 2, label: "tên" },
  { id: 4, label: "số lượng" },
  { id: 3, label: "giá" },
  { id: 5, label: "thành tiền" },
];
const rowLabel_min = [
  { id: 2, label: "tên" },
  { id: 4, label: "số lượng" },
  { id: 3, label: "giá" },
  { id: 5, label: "thành tiền" },
];
