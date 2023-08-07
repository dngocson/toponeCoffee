import Carosel from "../ui/Carosel";
import MainItems from "../features/main/MainItems";
import { CarouselImage } from "../helper/const";
const data = CarouselImage;
function Main() {
  return (
    <div>
      <Carosel data={data} place="main" />
      <MainItems />
    </div>
  );
}

export default Main;
