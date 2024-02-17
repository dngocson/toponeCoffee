import { memo } from "react";
import Map from "../ui/Map";

const Contact = memo(() => {
  return (
    <div className="container min-h-screen">
      <Map />
    </div>
  );
});

export default Contact;
