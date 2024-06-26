import PlacesList from "../components/places/PlacesList";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import { fetchPlaces } from "../util/database";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const [updatePlace, setUpdatePlace] = useState(false);

  const isFocused = useIsFocused();

  // useEffect will execute whenever this component receives focus with help of useIsFocused
  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }

    if (isFocused) {
      loadPlaces();
      // setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused, updatePlace]);

  return <PlacesList places={loadedPlaces} onPlaceUpdate={setUpdatePlace} />;
}

export default AllPlaces;
