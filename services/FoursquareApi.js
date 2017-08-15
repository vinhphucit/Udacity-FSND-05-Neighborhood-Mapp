var FoursquareApi = function () {
    var CLIENT_ID = "ICK4GLHZJPJGAVAZD5CSQLU5UD1MJKY4NZ2VEJGI0VDAMUQ2";
    var CLIENT_SECRET = "IT52JQ5CK2N0RCCNHJCGNZA2V34Z11ONVZ0VMWBLT3X14XBG";
    var URL_REQ = "https://api.foursquare.com/v2/venues/search?limit=1&v=20170101&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&ll=";
    this.requestFoursqureApi = function (lat, lng, callback) {
        $.getJSON(URL_REQ + lat + "," + lng).done(function (response) {
            callback(null, response);
        }).fail(function () {
                callback("error");
            }
        );
    }
}