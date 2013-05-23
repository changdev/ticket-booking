$(function() {

    function bookingViewModel() {
        var self = this;

        self.seats = ko.observableArray(makeSeats());

    };

    function formatedText (seat) {
        return seat.index + '$' + seat.price;
    };

    function makeSeats() {
        var seats = [];

        for (var i = 0; i < 6; i++) {
            this.seatsRow = [];
            for (var j = 0; j < 6; j++) {
                var seatIndex = String.fromCharCode('A'.charCodeAt() + j) + (i + 1);
                var seat = {
                    index: seatIndex,
                    price: (i + 1) * 100 + (100 - 10 * (j % 3)),
                    isBooked: false
                };
                // console.log(seat);
                seatsRow.push(seat);
            }
            // console.log(seatsRow);
            seats.push(seatsRow);
        }

        return seats;
    };


    ko.applyBindings(new bookingViewModel());
});