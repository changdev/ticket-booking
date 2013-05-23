$(function() {

    function bookingViewModel() {
        var self = this;
        
        // Editable data
        self.availableSeats = ko.observableArray(makeSeats());
        self.bookedSeats = ko.observableArray([
            new seatBooking('', self.availableSeats)
        ]);
        
        // Computed data
        self.totalPrice = ko.computed(function() {
            var total = 0;
            for (var i = 0; i < self.bookedSeats().length; i++) {
                total += self.bookedSeats()[i].seat().price;
            }
            return total ? '$' + total : 0;
        });

        // Operations
        self.addSeat = function () {
            self.availableSeats.remove(self.seat); // Removing this seat from available seats
            self.bookedSeats.push(new seatBooking('', self.availableSeats));
        };
        self.removeSeat = function(seat) {
            self.availableSeats.push(seat); // Adding this seat to availabes seats
            self.bookedSeats.remove(seat);
        };
    }

    // Function for displaying data in the booking table
    function seatBooking(name, seat) {
        var self = this;
        self.name = name;
        self.seat = ko.observable(seat);
        
        self.formattedPrice = ko.computed(function () {
            var price = self.seat().price || 0;
            return '$' + price;
        });
    }
    
    // Creating availabe seats
    function makeSeats() {
        var seats = [];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var seatIndex = String.fromCharCode('A'.charCodeAt() + j) + (i + 1);
                var seat = {
                    index: seatIndex,
                    price: (i + 1) * 100 + (50 - 10 * (j % 2)) // Some expression for genrating price
                };
                seats.push(seat);
            }
        }
        return seats;
    }


    ko.applyBindings(new bookingViewModel());
});