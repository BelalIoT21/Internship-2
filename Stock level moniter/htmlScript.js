const socket = new WebSocket('ws://localhost:8080');

let intervalId; // deklarera intervalId utanför onmessage-funktionen

// Denna funktion kommer att triggas varje gång ett meddelande tas emot från WebSocket
socket.onmessage = function(event) {
  // Få referenser till HTML-elementen som visar det mottagna meddelandet och varningen
  var messageEl = document.getElementById("message");
  var alertEl = document.getElementById("AlertMessage");
  var closeButton = document.getElementById("closeButton");
  var alarmSound = document.getElementById("alarmSound"); // get audio element

  // Uppdatera meddelandeelementet med mottagna data
  if (messageEl) {
    messageEl.innerHTML = event.data;
  }

  // Om lagernivån är större än 2, visa varningen och spela upp larmljudet
  if (parseFloat(event.data) > 2) {
    if (alertEl) {
      alertEl.style.display = "block";
      alarmSound.loop = true;
      alarmSound.play();

      // Kontrollera lagernivån var 5:e minut och spela upp larmet om det behövs
      intervalId = setInterval(function() {
        if (parseFloat(event.data) > 2) {
          alertEl.style.display = "block";
          alarmSound.play();
        } else {
          alertEl.style.display = "none";
          alarmSound.loop = false;
          alarmSound.pause();
          alarmSound.currentTime = 0;
          clearInterval(intervalId); // clear the interval when stock is below 2
        }
      }, 300000); // 5 minuter i millisekunder
    }
  } else {
    // Om lagernivån är mindre än eller lika med 2, dölj varningen och stoppa larmljudet
    if (alertEl) {
      alertEl.style.display = "none";
      alarmSound.loop = false;
      alarmSound.pause();
      alarmSound.currentTime = 0;
      clearInterval(intervalId); // rensa intervallet när lagret är under 2
    }
  }

  // Lägg till en händelseavlyssnare till stängningsknappen för att dölja varningen och stoppa larmljudet
  if (closeButton) {
    closeButton.addEventListener("click", function() {
      if (alertEl) {
        alertEl.style.display = "none";
        alarmSound.loop = false;
        alarmSound.pause();
        alarmSound.currentTime = 0;
      }
    });
  }
};
