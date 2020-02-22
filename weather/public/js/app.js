//Function: Get data onto the browser

console.log("java script is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector('input[type="text"]');  // css attribute selector
const messageOne = document.querySelector('#message-1');  
const messageTwo = document.querySelector('#message-2');  

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

   const location = search.value;
  // console.log(location);
  messageOne.textContent = "Loading ..."
  messageTwo.textContent = " "
  // fetch - browser based API
  fetch("http://localhost:3000/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
       //console.log(data.error);
       // console.log("You must submit a valid value")
       messageOne.textContent = data.error;
      } else {
        //console.log(data.location);
        //console.log(data.forecast);
        messageTwo.textContent = data.location;
        messageOne.textContent = data.forecast;


      }
    });
  });
});
