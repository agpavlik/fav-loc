import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";

// library that provides a Map component that uses Google Maps on Android and Apple Maps or Google Maps on iOS.
import MapView, { Marker } from "react-native-maps";

import IconButton from "../components/UI/IconButton";

function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    // define the center of the map.
    latitude: 37.78,
    longitude: -122.43,
    // Delta = size of the map - how much content beside the center will be visible (i.e. zoom level)
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // event handler that is called when the user clicks on the map.
  function selectLocationHandler(event) {
    // coordinates of the selected location.
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }

  //---- Confirm the picked location
  // useCallback for optimized performance: prevents unnecessary re-renders.
  // Memoizes a callback function: ensures it only re-evaluates when dependencies change.
  const savePickedLocationHandler = useCallback(() => {
    // Check if there is picked location
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location (by tapping on the map) first!"
      );
      return; // No continue with function execution if location was not picked
    }

    // navigate to the AddPlace screen and pass the picked location as a parameter
    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  //---- For executed just once use useLayoutEffect
  // the code inside useLayoutEffect is processed before the component is displayed;
  // fires before the browser repaints the screen.
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);
  //----

  return (
    <MapView // https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
      style={styles.map}
      initialRegion={region} // the initial region to be displayed by the map (when it is first loaded).
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1, // fill the entire screen
  },
});
