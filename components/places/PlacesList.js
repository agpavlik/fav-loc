import { FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";

function PlacesList({ places }) {
  const navigation = useNavigation(); // Hook adds access to the navigation object

  // Use navigation object to navigate away whenever a place is selected.
  function selectPlaceHandler(id) {
    navigation.navigate("PlaceDetails", {
      placeId: id,
    });
  }

  // Check if places is null or undefined and return a fallback text.
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={selectPlaceHandler} />
      )} // Function that controls which kind of component will be used for every item that's passed into FlatList.
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 10,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
