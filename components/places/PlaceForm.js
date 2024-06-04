import { useState, useCallback } from "react";
import { TextInput, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/place";

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  // ---- Get title of place
  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }
  // ----

  // ---- Get imageUri
  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }
  // ----

  // ---- Get location. Use useCallback to avoid recreated of function unnecessarely
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);
  // ----

  // ---- Save the place on the device
  function savePlaceHandler() {
    // console.log(enteredTitle);
    // console.log(selectedImage);
    // console.log(pickedLocation);
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  }
  // ----

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 4,
    fontSize: 18,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 3,
    borderRadius: 2,
    backgroundColor: Colors.primary100,
  },
});
