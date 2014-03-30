function polling_walkscore(milliseconds) {
  setInterval(function() {
    navigator.geolocation.getCurrentPosition(function(pos) {
      var coords = pos.coords;
      localStorage.setItem('coords', coords);
      //var latlongQuery = "?lat=" + coords.latitude + "&long=" + coords.longitude;
      var lat = coords.latitude;
      var long = coords.longiute;
      var testUrl = "http://unispon.com/hackduke/index.php/sepp/walkscore/?lat=" + lat + "&long=" + long;
      ajax({ url: testUrl, type: 'json' }, function(data) {
          simply.text({ title: "Walkscore: " + data.walkscore , subtitle: data.message });
          //simply.style(mono);
          if (data.workscore > 50) {
              simply.vibe('short');
          }
          else if (data.walkscore > 30) {
              simply.vibe('long');
          }
          else {
              simply.vibe('long');
              simply.vibe('long');
              simply.vibe('long');
          }
      });
    
      return coords;
    });
  }, 50000);
}

polling_walkscore(2000);
var count = 0;

simply.on('singleClick', function(e) {
  if (e.button === 'up') {
    count++;
  } else if (e.button === 'select') {
    count = 0;
  }
  if (count > 2) {
    simply.subtitle((5-count) + ' times left');
  }
  if (count >= 5) {
      navigator.geolocation.getCurrentPosition(function(pos) {
        var coords = pos.coords;
        var emergency_message = "I am in dangerous situation. Please call 911. My position is at " + coords.latitude + "," + coords.longitude;
        var emergency_call_api = "http://unispon.com/hackduke/index.php/sepp/call";
        var emergency_text_api = "http://unispon.com/hackduke/index.php/sepp/text/?message=" + emergency_message;
        simply.subtitle('Getting emergency!!!');

        ajax({ url: emergency_text_api, type: 'json' }, function(data) {
            count = 0;
        });
      });
  }
});
