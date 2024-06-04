// Blueprint for place objects
export class Place {
  constructor(title, imageUri, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng }; // { lat: 0.141241, lng: 127.121 }
    this.id = new Date().toString() + Math.random().toString(); // generate a pseudo unique ID by using the current date and converting it to a string, and concatenating some random number to that, also convert it to a string.
  }
}
