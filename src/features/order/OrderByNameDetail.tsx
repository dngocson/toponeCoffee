import { formatCurrencyNumber } from "../../helper/helperFunctions";
import Heading from "../../ui/Heading";

export const OrderByNameDetail = ({ items }: { items: any }) => {
  return (
    <div>
      <div className="grid grid-cols-orderDetailTable border-2 border-blue-400">
        {rowLabel.map((item, index) => (
          <span key={index} className="font-bold">
            <Heading
              addStyle={`w-full border-2  text-center ${
                index !== 4 ? "border-r-blue-400" : ""
              }`}
              key={item.id}
              type="sub"
            >
              {item.label}
            </Heading>
          </span>
        ))}
      </div>
      {items.map((item: any, index: number) => (
        <div
          key={index}
          className="grid grid-cols-orderDetailTable  border-2 border-t-0 border-blue-400"
        >
          <Heading
            addStyle="w-full border-2 border-r-blue-400 text-center"
            type="sub"
          >
            {index + 1}
          </Heading>
          <Heading
            addStyle="w-full border-2 text-center border-r-blue-400"
            type="sub"
          >
            {item.name}
          </Heading>
          <Heading
            addStyle="w-full border-2 text-center  border-r-blue-400"
            type="sub"
          >
            {item.quantity}
          </Heading>
          <Heading
            addStyle="w-full border-2 text-center  border-r-blue-400"
            type="sub"
          >
            {item.price}
          </Heading>
          <Heading addStyle="w-full text-center border-2 " type="sub">
            {formatCurrencyNumber((item.quantity * item.price).toString())}
          </Heading>
        </div>
      ))}
    </div>
  );
};
const rowLabel = [
  { id: 1, label: "stt" },
  { id: 2, label: "tên" },
  { id: 4, label: "số lượng" },
  { id: 3, label: "giá" },
  { id: 5, label: "thành tiền" },
];
