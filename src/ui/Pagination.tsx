import { useSearchParams } from "react-router-dom";
export const PAGE_SIZE = 10;
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
    <div>
      Hiển thị <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> đến{" "}
      <span>{currentPage === pageCount ? count : currentPage * PAGE_SIZE}</span>{" "}
      của
      <span>{count}</span> kết quả
      <button disabled={currentPage === 1} onClick={prevPage}>
        Tới trước
      </button>
      <button disabled={currentPage === pageCount} onClick={nextPage}>
        Về sau
      </button>
    </div>
  );
}

export default Pagination;
