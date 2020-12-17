const weatherForm = document.querySelector('form');
const searchTextBox = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = "";

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = "Loading....";
    messageTwo.textContent = "";

    fetch(`/weather?address=${searchTextBox.value}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
            }
            else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
})
    
