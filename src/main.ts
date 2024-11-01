import "./style.css";
import "./peer-clients-control";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./socket-client";
import "./buttons";

function updateCameraList(cameras: MediaDeviceInfo[] = []) {
  const listElement = document.querySelector(
    "select#select-devices"
  ) as HTMLSelectElement;
  listElement.innerHTML = "";

  cameras
    .map((camera: MediaDeviceInfo) => {
      const cameraOption = document.createElement("option");
      cameraOption.label = camera.label;
      cameraOption.value = camera.deviceId;
      return cameraOption;
    })
    .forEach((cameraOption: HTMLOptionElement) =>
      listElement.add(cameraOption)
    );
}

// Fetch an array of devices of a certain type
async function getConnectedDevices(type: string): Promise<MediaDeviceInfo[]> {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const devicesVideoInpunt = devices.filter((device) => device.kind === type);
  return devicesVideoInpunt;
}
// Get the initial set of cameras connected

getConnectedDevices("videoinput")
  .then((cameras) => {
    updateCameraList(cameras);
  })
  .catch(console.error);

//Listen for changes to media devices and update the list accordingly
navigator.mediaDevices.addEventListener("devicechange", async () => {
  const newCameraList: MediaDeviceInfo[] = await getConnectedDevices("video");
  updateCameraList(newCameraList);
});
