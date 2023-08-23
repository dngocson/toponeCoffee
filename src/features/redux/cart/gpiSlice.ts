import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../../helper/helperFunctions";
// Helper function
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation positionconst positionObj = await getPosition();
    const positionObj = (await getPosition()) as GeolocationPosition;
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);

    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address };
  },
);
let storedAddress = { position: { latitude: 0, longitude: 0 }, address: "" };
const storedPosition = sessionStorage.getItem("gpi");
if (storedPosition !== null) {
  storedAddress = JSON.parse(storedPosition);
}
const initialState = {
  status: "idle",
  position: storedAddress.position,
  address: storedAddress.address,
  error: "",
};
const gpiSlice = createSlice({
  name: "gpi",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        sessionStorage.setItem(
          "gpi",
          JSON.stringify({
            position: action.payload.position,
            address: action.payload.address,
          }),
        );
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
        state.error = " Kkhông thể lấy vị trí, hãy cho phép vị trí của bạn";
      }),
});
export default gpiSlice.reducer;
