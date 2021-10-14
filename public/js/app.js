const weatherForm = document.querySelector("form");
const inputCidade = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageErro = document.querySelector("#message-erro");

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
