console.log("Starting lodging");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  message1.textContent = "loading ....";
  message2.textContent = "";

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          message1.textContent = "Error: " + data.error;
        } else {
          message1.textContent = data.location;
          message2.textContent = data.forecast;
        }
      });
    }
  );
});
