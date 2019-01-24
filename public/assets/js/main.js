buttons = Array.prototype.slice.call(document.querySelectorAll("button"));
burgerInput = document.querySelector('#burger-input');
notDevouredUl = document.querySelector('.not-devoured ul');
devouredUl = document.querySelector('.devoured ul');



document.addEventListener('click', (event) => {

  if(event.target.id == "add-burger"){
    APIAddBurger(burgerInput.value);
  }

  if(event.target.className.includes("eat-button")){
    APIDevourBurger(event.target.dataset.burgerId)
  }

});

function APIGetBurger(cb) {
  var data = new FormData();
  var xhr = new XMLHttpRequest();
  	
	xhr.addEventListener("readystatechange", function () {
	  if (this.readyState === 4) {
	    cb(this.responseText);
	  }
	});
	
	xhr.open("GET", "http://localhost:8080/api/burgers");	
	xhr.send(data);
}

function APIAddBurger(burger) {
  var data = JSON.stringify({ "name" : burger });
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
    }
  });

  xhr.open("POST", "http://localhost:8080/api/burger");
  xhr.setRequestHeader("content-type", "application/json");

  xhr.send(data);

  updatePage();
}

function updatePage(){
  //empty devoured and not-devoured
  devouredUl.innerHTML = "";
  notDevouredUl.innerHTML = "";

  APIGetBurger((burgerJSON) => {
    buildBurgers(burgerJSON);
  })
}

function buildBurgers(burgerJSON) {
  burgerJSON = JSON.parse(burgerJSON);

  burgerJSON.forEach((element, index) => {

    let newLi = document.createElement('li');
    let newBurger = document.createTextNode(burgerJSON[index].id +". " + burgerJSON[index].burger_name);
    newLi.appendChild(newBurger);
    
    if(element.devoured === false) {
      let newButton = document.createElement('button');
      let buttonText = document.createTextNode("Eat");
      newButton.className += " eat-button"
      newButton.dataset.burgerId = burgerJSON[index].id;

      newLi.appendChild(newButton);
      newButton.appendChild(buttonText);
      notDevouredUl.appendChild(newLi);

    } else {
      devouredUl.appendChild(newLi);
    }
  });
}

function APIDevourBurger(burgerId) {
var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    updatePage();
  }
});

xhr.open("PUT", `http://localhost:8080/api/burger/${burgerId}`);
xhr.send();

}

updatePage();