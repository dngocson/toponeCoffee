import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import milkIcon from "../assets/iconMilkTea.png";
const zoom = 15;
const markers = [
  {
    geocode: { latitude: 20.987163, longitude: 105.536492 },
    popup: "Chân cầu vượt Bắc Phú Cát, Thạch Hòa, Thạch Thất, Hà Nội",
    index: 0,
    order: "Cơ sở 1: ",
  },
  {
    geocode: { latitude: 20.989113, longitude: 105.536118 },
    popup: "Chân cầu vượt Bắc Phú Cát, Thạch Hòa, Thạch Thất, Hà Nội",
    index: 1,
    order: "Cơ sở 2: ",
  },
];

function Map() {
  const [map, setMap] = useState<any>(null);
  const markerRef = useRef<any>([]);
  const userIconRef = useRef<any>();
  const storedUserlocation = JSON.parse(
    sessionStorage.getItem("gpi") ??
      '{"position":{"latitude":0,"longitude":0}}',
  );
  const storedUserLocation = {
    latitude: storedUserlocation?.position?.latitude,
    longitude: storedUserlocation?.position?.longitude,
  };

  const [userlocation, setUserLocation] = useState(storedUserLocation);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setErrorMessage(null);
        console.log("okie");
      },
      (error) => {
        console.log(error.message);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMessage(
              "Bạn đã tắt chức năng cho phép định vị, vui lòng xem lại cài đặt của bạn",
            );
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMessage("Vị trí hiện tại không khả dụng.");
            break;
          case error.TIMEOUT:
            setErrorMessage("Chức năng tìm vị trí không phản hồi.");
            break;
          // case error.UNKNOWN_ERROR:
          //   setErrorMessage("An unknown error occurred.");
          //   break;
        }
      },
    );
  };
  useEffect(() => {
    fetchUserLocation();
  }, [errorMessage]);

  const customIcon = useMemo(
    () =>
      new Icon({
        iconUrl: milkIcon,
        iconSize: [50, 50],
      }),
    [],
  );
  const userIcon = useMemo(
    () =>
      new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/1365/1365700.png",
        iconSize: [40, 40],
      }),
    [],
  );

  const displayMap = useMemo(() => {
    const haveLocation =
      userlocation.latitude !== 0 && userlocation.longitude !== 0;
    console.log(userlocation);
    return (
      <div className="col-span-1 overflow-hidden rounded-2xl md:col-span-6 lg:col-span-6">
        <MapContainer
          className="z-1 h-[40vh] md:h-[75vh]"
          center={[20.987163, 105.536492]}
          zoom={15}
          zoomControl={false}
          ref={setMap}
        >
          {/* <TileLayer
            url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          /> */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={[marker.geocode.latitude, marker.geocode.longitude]}
              icon={customIcon}
              ref={(ref) => (markerRef.current[index] = ref)}
            >
              <Popup closeButton={false}>
                <p className="text-xs">
                  <span className="text-blue-600">{marker.order}</span>
                  <span>{marker.popup}</span>
                </p>
              </Popup>
            </Marker>
          ))}

          {haveLocation && (
            <Marker
              ref={userIconRef}
              position={[userlocation.latitude, userlocation.longitude]}
              icon={userIcon}
            >
              <Popup
                closeButton={false}
                autoClose={false}
              >{`Vị trí hiện tại của bạn`}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    );
  }, [customIcon, userlocation.latitude, userlocation.longitude]);

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-10 md:gap-5">
      {map ? (
        <DisplayPosition
          map={map}
          markerRef={markerRef}
          fetchUserLocation={fetchUserLocation}
          errorMessage={errorMessage}
          userlocation={userlocation}
          userIconRef={userIconRef}
        />
      ) : null}
      {displayMap}
    </div>
  );
}

export default Map;

function DisplayPosition({
  map,
  markerRef,
  userlocation,
  fetchUserLocation,
  errorMessage,
  userIconRef,
}) {
  const onClick = useCallback(
    (location) => {
      map.flyTo([location.geocode.latitude, location.geocode.longitude], zoom);
      markerRef.current[location.index].openPopup();
    },
    [map, markerRef],
  );
  const moveToUserPos = useCallback(
    (location) => {
      map.flyTo(location, zoom);
      userIconRef.current.openPopup();
    },
    [map],
  );
  return (
    <div className="col-span-1 overflow-hidden rounded-2xl bg-gray-200 p-4 text-xs  sm:text-sm md:col-span-4 md:text-base lg:col-span-4  xl:text-xl">
      <div className="flex flex-col gap-4">
        <h2 className="font-bold md:text-lg  xl:text-2xl">
          Các phương thức liên lạc:
        </h2>
        <p>
          Số điện thoại:
          <a className="text-blue-700" href="tel:+84942885082">
            +84942885082
          </a>
        </p>
        <p>
          Zalo:
          <a className="text-blue-700" href="https://zalo.me/0942885082">
            Trà sữa Top One
          </a>
        </p>
        <p>
          Facebook:
          <a
            className="text-blue-700"
            href="https://www.facebook.com/profile.php?id=61550326331533"
            target="blank"
          >
            Trà sữa Top One
          </a>
        </p>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=20.987163,105.536492`}
          className=" font-bold text-blue-700 hover:text-blue-900"
          target="blank"
        >
          Hướng dẫn chỉ đường tới Top One
        </a>
      </div>
      <div className="my-6">
        <h2 className="my-2 font-bold  md:text-lg xl:text-2xl">
          Các cơ sở của Top One
        </h2>
        {markers.map((location) => (
          <div key={location.index} className="border-b py-2">
            <p>
              <span className="font-bold">{location.order}</span>
              <span
                className="cursor-pointer text-blue-700"
                onClick={() => onClick(location)}
              >
                {location.popup}
              </span>
            </p>
          </div>
        ))}
        {errorMessage && <p>{errorMessage}</p>}
        {!(userlocation.latitude !== 0 || userlocation.longitude !== 0) && (
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={fetchUserLocation}
          >
            Tìm vị trí của bạn
          </button>
        )}
        {!errorMessage &&
          userlocation.latitude !== 0 &&
          userlocation.longitude !== 0 && (
            <p className=" pt-2">
              <button
                className="font-bold text-blue-700 hover:text-blue-900"
                onClick={() =>
                  moveToUserPos([userlocation.latitude, userlocation.longitude])
                }
              >
                Tìm vị trí hiện tại của bạn
              </button>
            </p>
          )}
      </div>
    </div>
  );
}
