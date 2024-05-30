// Blueprint for place objects
class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; // { lat: 0.141241, lng: 127.121 }
    this.id = new Date().toString() + Math.random().toString(); // generate a pseudo unique ID by using the current date and converting it to a string, and concatenating some random number to that, also convert it to a string.
  }
}
