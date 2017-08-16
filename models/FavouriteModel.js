/**
 * @description Represents a Model for restaurant
 * @constructor
 * @param {string} name - The name of restaurant
 * @param {string} latitude - The latitude of restaurant
 * @param {string} longitude - The longitude of restaurant
 */
var FavouriteModel = function (name, latitude, longitude) {
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
}