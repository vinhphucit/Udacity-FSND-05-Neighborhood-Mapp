var ViewModel = function () {
    var self = this;

    var originalArray = [
        new FavouriteModel("Thai Express", 21.00769254029714, 105.8023798259395),
        new FavouriteModel("King BBQ", 21.00783566823813, 105.80255180433008),
        new FavouriteModel("My Way Cafe", 21.007411383682005, 105.80309067099071),
        new FavouriteModel("TOKYO Deli", 21.00806831796098, 105.80129063318412),
        new FavouriteModel("Paris Baguette", 21.00660013430285, 105.80353208421363),
        new FavouriteModel("Quan An Ngon 25T2 Hoang Dao Thuy", 21.00727868835967, 105.80213785171509)
    ];

    this.favouriteFilter = ko.observable("");
    this.filterArray = ko.computed(function () {

        var filteredArray = [];
        originalArray.forEach(function (favourite, index) {
            if (favourite.name.toLowerCase().indexOf(self.favouriteFilter().toLowerCase()) !== -1) {
                filteredArray.push(favourite);
                if (favourite.marker !== null) {
                    if (favourite.marker.getVisible() === false)
                        favourite.marker.animation = google.maps.Animation.DROP;
                    favourite.marker.setMap(self.map);
                }
            } else {
                if (favourite.marker !== null)
                    favourite.marker.setMap(null);

            }
        });
        return filteredArray;
    });
    // this.filteredList = ko.computed(function () {
    //     console.log(self.favouriteFilter());
    //     var filter = self.favouriteFilter().toLowerCase();
    //     if (!filter) {
    //         self.locationList().forEach(function (locationItem) {
    //             locationItem.visible(true);
    //         });
    //         return self.locationList();
    //     } else {
    //         return ko.utils.arrayFilter(self.locationList(), function (locationItem) {
    //             var string = locationItem.name.toLowerCase();
    //             var result = (string.search(filter) >= 0);
    //             locationItem.visible(result);
    //             return result;
    //         });
    //     }
    // }, self);

    this.initMap = function () {

        self.map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: {lat: 21.0075704, lng: 105.8029119},
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.LEFT_BOTTOM
            },
        });

        self.foursquareInfoWindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();

        originalArray.forEach(function (fav, index) {
            fav.marker = self.createMarker(fav);
            bounds.extend(fav.marker.position);
        });
        self.map.fitBounds(bounds);
    };


    this.selectFavourite = function (data) {
        self.populateInfoWindow(data.marker, self.foursquareInfoWindow);
    };

    this.createMarker = function (fav) {
        var marker = new google.maps.Marker({
            position: {
                lat: fav.latitude,
                lng: fav.longitude
            },
            icon: self.makeMarkerIcon(true),
            map: self.map,
            title: fav.name,
            animation: google.maps.Animation.DROP
        });
        marker.addListener('click', function () {
            self.populateInfoWindow(this, self.foursquareInfoWindow);
        });
        marker.addListener('mouseover', function () {
            this.setIcon(self.makeMarkerIcon(false));
        });
        marker.addListener('mouseout', function () {
            this.setIcon(self.makeMarkerIcon(true));
        });
        return marker;
    };
    this.populateInfoWindow = function (marker, infowindow) {
        if (infowindow.marker != marker) {
            self.map.panTo(new google.maps.LatLng(marker.position.lat(), marker.position.lng()));
            marker.setAnimation(google.maps.Animation.BOUNCE);
            infowindow.marker = marker;
            setTimeout(function () {
                marker.setAnimation(null);
            }, 2000);
            infowindow.setContent('<div>Loading..</div>');
            infowindow.open(self.map, marker);
            infowindow.addListener('closeclick', function () {
                infowindow.marker = null;
            });
        }
        var foursquareApi = new FoursquareApi();
        foursquareApi.requestFoursqureApi(marker.position.lat(), marker.position.lng(), function (err, response) {
            if (!err) {
                if (response.response.venues.length > 0) {
                    var venue = response.response.venues[0];

                    infowindow.setContent('<div><strong>Name: ' + venue.name + '</strong></div><div>Address: ' + venue.location.formattedAddress[0] + '</div><div>Phone: ' + venue.contact.phone + ' </div>');
                }

                console.log(response);
            } else {
                alert("Can not load data from Foursquare, please try again later");
                infowindow.close();
            }
        });

    };

    this.makeMarkerIcon = function (defaultIcon) {
        if (defaultIcon)
            return new google.maps.MarkerImage("imgs/marker.png");
        else
            return new google.maps.MarkerImage("imgs/marker_hover.png");
    };
};
var vm = new ViewModel();
ko.applyBindings(vm);
function initMapAsyn() {
    vm.initMap();
}