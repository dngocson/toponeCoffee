import { useSearchParams } from "react-router-dom";
export const PAGE_SIZE = 15;
function Pagination({ count }: { count: number }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const pageCount = Math.ceil(count / PAGE_SIZE);
  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next.toString());
    setSearchParams(searchParams);
  }
  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev.toString());
    setSearchParams(searchParams);
  }
  if (pageCount <= 1) return null;
  return (
    <div className="mt-2 flex items-center justify-between">
      <div>
        Hiển thị kết quả{" "}
        <span className="font-bold">{(currentPage - 1) * PAGE_SIZE + 1}</span>{" "}
        đến kết quả{" "}
        <span className="font-bold">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        của <span className="font-bold">{count}</span> kết quả
      </div>
      <div className="flex gap-4">
        <button
          className="rounded-md bg-blue-600 p-2 text-white transition-all duration-300 disabled:bg-blue-400"
          disabled={currentPage === 1}
          onClick={prevPage}
        >
          Tới trước
        </button>
        <button
          className="rounded-md bg-blue-600 p-2 text-white transition-all duration-300 disabled:bg-blue-400"
          disabled={currentPage === pageCount}
          onClick={nextPage}
        >
          Về sau
        </button>
      </div>
    </div>
  );
}

export default Pagination;
