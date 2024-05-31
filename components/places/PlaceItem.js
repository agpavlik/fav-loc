import { Image, Pressable, StyleSheet, Text, View } from "react-native";

function PlaceItem({ place, onSelect }) {
  return (
    <Pressable onPress={onSelect}>
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
      <Image source={{ uri: place.imageUri }} />
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({});
