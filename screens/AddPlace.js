import PlaceForm from "../components/places/PlaceForm";

// helper functions to work with SQLite
import { insertPlace } from "../util/database";

function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    // insert the place into the database.
    await insertPlace(place);
    // navigate to 'AllPlaces' screen.
    navigation.navigate("AllPlaces", {
      place: place,
    });
  }
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
