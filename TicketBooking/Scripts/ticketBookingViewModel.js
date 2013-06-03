$(function() {

    function bookingViewModel() {
        var self = this;
        
        // Editable data
        self.availableSeats = ko.observableArray(makeSeats());
        self.bookedSeats = ko.observableArray([
            new SeatBooking('', self.availableSeats)
        ]);
        self.totalFunds = ko.observable(1000);

        // Computed data
        self.totalPrice = ko.computed(function() {
            var total = 0;
            for (var i = 0; i < self.bookedSeats().length; i++) {
                total += self.bookedSeats()[i].seat().price;
                
            }
            return total ? '$' + total.toFixed(0) : 0;
        });
        self.availableFunds = ko.computed(function () {
            var left =  self.totalFunds() - self.totalPrice().toString().substr(1);

            return left;
        });

        // Operations
        self.addSeat = function () {
            //self.availableSeats.remove(seat); // Removing this seat from available seats
 
            self.bookedSeats.push(new SeatBooking('', self.availableSeats));
        };
        self.removeSeat = function (bookedSeat) {
            //self.availableSeats.push(bookedSeat.seat); // Adding this seat to availabes seats
            

            self.bookedSeats.remove(bookedSeat);
        };
    }

    // Class for displaying data in the booking table
    function SeatBooking(name, seat) {
        var self = this;
        self.name = name;
        self.seat = ko.observable(seat);
        
        self.formattedPrice = ko.computed(function () {
            var price = self.seat().price || 0;
            return '$' + price.toFixed(0);
        });
    }
    
    // Creating availabe seats
    function makeSeats() {
        var seats = [];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var seatIndex = String.fromCharCode('A'.charCodeAt() + j) + (i + 1);
                var price = Math.random() * 400 + 100;
                var seat = new Seat(seatIndex, price);
                seats.push(seat);
            }
        }
        return seats;
    }
    // Class for seat
    function Seat(index, price) {
        var self = this;
        self.index = index;
        self.price = price;
    }

    // Custom binding for smooth showing waring messasge
    ko.bindingHandlers.fadeWaring = {
        update: function(element, valueAccessor) {
          var shouldDisplay = valueAccessor();
          shouldDisplay ? $(element).fadeIn() : $(element).fadeOut(0);
      }  
    };

    // Custom binding for glowing funds if they are over
    ko.bindingHandlers.glow = {
        update: function(element, valueAccessor) {
            var shouldGlow = valueAccessor();
            if (shouldGlow) {
                $(element).css({
                    color: 'red',
                    'font-weight': 'bold'
                });

            } else {
                $(element).css({
                    color: 'black',
                    'font-weight': 'normal'
                });
            }
        }  
    };

    ko.applyBindings(new bookingViewModel());
});