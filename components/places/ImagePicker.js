// ImagePicker provides access to the system's UI for selecting images and videos from the phone's library or taking a photo with the camera.
// https://docs.expo.dev/versions/latest/sdk/imagepicker/

import { Alert, View, StyleSheet, Image, Text } from "react-native";
import {
  launchCameraAsync, //launch the device camera and wait for take an image
  useCameraPermissions, // check if the user has granted permission to use the camera.
  PermissionStatus, // enum of possible permission statuses, returned by useCameraPermissions(); see https://docs.expo.dev/versions/latest/sdk/imagepicker/#permissionstatus
} from "expo-image-picker";
import { Colors } from "../../constants/colors";
import { useState } from "react";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker({ onTakeImage }) {
  const [pickedImage, setPickedImage] = useState();

  // ---- permission for iOS
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions(); // executed only once when the component mounts.

  // Check if permission has already exist and do not request permission again
  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted; // result true or false
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    return true;
  }
  // ----

  // Handle image
  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    // If there is no permission -> return to cancel the execution of this function
    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true, // whether to show a UI to edit the image after it is picked.
      aspect: [16, 9], // aspect ratio to maintain if the user is allowed to edit the image (by passing allowsEditing: true).
      quality: 0.5, // specify the quality of compression, from 0 to 1; we want to limit the quality/image size.
    });
    console.log(image);
    console.log(image.assets[0].uri);
    setPickedImage(image.assets[0].uri); // Store picked image
    onTakeImage(image.assets[0].uri); // pass the image uri to PlaceForm (parent component).
  }

  // Show text if there is no image yet
  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  // ----

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take image
      </OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 160,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 2,
    overflow: "hidden", // hide the image if it is larger than the container.
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
