const weatherForm = document.querySelector("form");
const inputCidade = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageErro = document.querySelector("#message-erro");
const getLocation = document.querySelector("#get-location");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = inputCidade.value;
  messageOne.textContent = "Carregando...";
  messageTwo.textContent = "";
  messageErro.textContent = "";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageErro.textContent = data.error;
        messageOne.textContent = "";
      } else {
        messageErro.textContent = "";
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});

getLocation.addEventListener("click", (e) => {
  e.preventDefault();

  messageOne.textContent = "Carregando...";

  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by this browser.");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const currentLatitude = position.coords.latitude.toString();
    const currentLongitude = position.coords.longitude.toString();

    fetch(
      `/currentweather?lat=${currentLatitude}&long=${currentLongitude}`
    ).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          messageErro.textContent = data.error;
          messageOne.textContent = "";
        } else {
          messageOne.textContent = "";
          messageTwo.textContent = data.forecast;
        }
      });
    });
  });
});
