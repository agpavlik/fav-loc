import PlacesList from "../components/places/PlacesList";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();

  // useEffect will execute whenever this component receives focus with help of useIsFocused
  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused, route]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
