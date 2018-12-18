$(document).ready(function () {

    // starting array of string to create buttons
    var list = ['tiger', 'lion', 'turle', 'alligator', 'hyena', 'whale', 'dog', 'cat']

    //creates buttons for each item in array
    for (var i = 0; i < list.length; i++) {
        var newButton = $('<button>')
        newButton.text(list[i])

        $('#buttonHolder').append(newButton)
    }

    $('button').on('click', function () {

        var animal = $(this).text()
        console.log(animal)

        var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' +
            animal + '&api_key=mV3ts6f731nMsgNmNQEmFpTCwpGZmirk&limit=5';

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $('<div>');
                    var rating = results[i].rating;

                    var p = $('<p>').text('Rating: ' + rating);

                    var gif = $('<img>');

                    gif.attr({
                        src: results[i].images.fixed_height_still.url,
                        dataStill: results[i].images.fixed_height_still.url,
                        dataAnimate: results[i].images.fixed_height.url,
                        dataState: 'still',
                        class: 'gif'
                    })


                    gifDiv.append(p);
                    gifDiv.append(gif);

                    $('#gifDisplay').prepend(gifDiv)

                    gif.on('click', function () {
                        var state = $(this).attr("dataState");
                        if (state === "still") {
                            $(this).attr("src", $(this).attr("dataAnimate"));
                            $(this).attr("dataState", "animate");
                        } else {
                            $(this).attr("src", $(this).attr("dataStill"));
                            $(this).attr("dataState", "still");
                        }
                    })

                }



            })

    })

    $('#newAnimal').on('click', function () {
        event.preventDefault();

        var newEntry = $('#entry').val().trim()
        console.log(JSON.stringify(newEntry))

        list.push(newEntry)

        $('#buttonHolder').html('')

        for (var i = 0; i < list.length; i++) {
            var newButton = $('<button>')
            newButton.text(list[i])

            $('#buttonHolder').append(newButton)
        }

        $('button').on('click', function () {

            var animal = $(this).text()
            console.log(animal)
    
            var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' +
                animal + '&api_key=mV3ts6f731nMsgNmNQEmFpTCwpGZmirk&limit=5';
    
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {
                    var results = response.data;
    
                    for (var i = 0; i < results.length; i++) {
                        var gifDiv = $('<div>');
                        var rating = results[i].rating;
    
                        var p = $('<p>').text('Rating: ' + rating);
    
                        var gif = $('<img>');
    
                        gif.attr({
                            src: results[i].images.fixed_height_still.url,
                            dataStill: results[i].images.fixed_height_still.url,
                            dataAnimate: results[i].images.fixed_height.url,
                            dataState: 'still',
                            class: 'gif'
                        })
    
    
                        gifDiv.append(p);
                        gifDiv.append(gif);
    
                        $('#gifDisplay').prepend(gifDiv)
    
                        gif.on('click', function () {
                            var state = $(this).attr("dataState");
                            if (state === "still") {
                                $(this).attr("src", $(this).attr("dataAnimate"));
                                $(this).attr("dataState", "animate");
                            } else {
                                $(this).attr("src", $(this).attr("dataStill"));
                                $(this).attr("dataState", "still");
                            }
                        })
    
                    }
    
    
    
                })
    
        })
    

    })



})
