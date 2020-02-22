

  function initMap() {
       
    const loc = {lat: 42.361145  ,lng: -71.057083};

    const map = new google.maps.Map(document.querySelector('.map'), {
        zoom: 8,
      center: loc
    });

    const marker = new google.maps.marker({ position: loc, map: map });
  }



  