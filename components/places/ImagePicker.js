import { Alert, Button, View, StyleSheet, Image, Text } from "react-native";
import {
  launchCameraAsync, //launch the device camera and wait for take an image
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../constants/colors";
import { useState } from "react";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker() {
  const [pickedImage, setPickedImage] = useState();

  // ---- permission for iOS
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

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
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image);
    setPickedImage(image.assets[0].uri); // Store picked image
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
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
