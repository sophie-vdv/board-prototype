// TIME ZONE
var londonDate = moment().tz("Europe/London").format('DD-MMM');
document.getElementById("london_date").innerHTML = londonDate;

var londonTime = moment().tz("Europe/London").format('hh:mm a');
document.getElementById("london_time").innerHTML = londonTime;

var seattleTime = moment().tz("America/Los_Angeles").format('hh:mm a');
document.getElementById("seattle_time").innerHTML = seattleTime;

var brusselsTime = moment().tz("Europe/Brussels").format('hh:mm a');
document.getElementById("brussels_time").innerHTML = brusselsTime;

var tokyoTime = moment().tz("Asia/Tokyo").format('hh:mm a');
document.getElementById("tokyo_time").innerHTML = tokyoTime;

var sydneyTime = moment().tz("Australia/Sydney").format('hh:mm a');
document.getElementById("sydney_time").innerHTML = sydneyTime;


// WEATHER
$(document).ready(function() {
    $.simpleWeather({
        woeid: '44418', //44418
        location: "London, Uk",
        unit: 'c',
        success: function(weather) {
            html = '<i class="icon-'+weather.code+'"></i>';
            html += '<div class="current">'+weather.temp+'&deg;'+weather.units.temp+'</div>';
            html += '<div class="current-description">'+weather.currently+'</div>';

            for(var i=0;i<weather.forecast.length;i++) {

                var highTemp = weather.forecast[i].high;
                var weekDays = weather.forecast[i].day;

                html += '<div class="days">'+highTemp+'<div class="max">'+'<div class="temp" data-height="'+highTemp+'"></div>'+'<div class="degree-zero"></div>'+'</div>'+weekDays+'</div>';
            }

            $("#weather").html(html);

            $('.temp').each(function(){
                var height = $(this).attr('data-height');
                $(this).height(height*5)

                if(height < 0) {
                    $(this).addClass('negative-value');
                } else if (height >= 0) {
                    $(this).addClass('positive-value');
                }
            });
        },
        error: function(error) {
            $("#weather").html('<p>'+error+'</p>');
        }
    });

});

$(document).ready(function() {
    getData();
});


function getData() {
    $.getJSON('https://new.thisplace.com/sophie_slack_test/proxy.php?file=data.json', function(data){
        $('#message').html(data.text);
        sendToSlack();
    });
}

setInterval(getData, 3000);

function sendToSlack(){
    var settings ={
        url: "https://hooks.slack.com/services/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",
        method: "POST",
        dataType: "application/x-www-form-urlencoded",
        data: {
            "payload": JSON.stringify({text: $("#message").val()})
        }
    }

    $.ajax(settings).done(function (response){
        console.log(response);
    })
}




