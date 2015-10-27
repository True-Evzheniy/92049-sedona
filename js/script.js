var displays = document.querySelectorAll(".no-js");
var elements = document.querySelectorAll(".counter");
var navigation=document.querySelector(".navigation__list");
var close=document.querySelector(".navigation__close");
var burger=document.querySelector(".navigation__burger");

// menu
navigation.classList.add("navigation__list--close");

burger.addEventListener("click",function(event){
	event.preventDefault();
	navigation.classList.toggle("navigation__list--close");
});
close.addEventListener("click",function(event){
	event.preventDefault();
	navigation.classList.toggle("navigation__list--close");
});


//parse date
var dateField = document.querySelector("#date-field");
dateInit(dateField);

function dateInit(field){
	var minus = field.querySelector(".icon-minus");
	var plus = field.querySelector(".icon-plus");
	var dateout = field.querySelector("#dateout")
	plus.addEventListener("click", function(event){
		var days = field.querySelector("#day-counter").value;
		days = Number(days) + 1;
		var indate = field.querySelector("#datein").value;
		indate = moment(indate,"DD MMM YYYY","ru");
		indate.add(days,"day");
		dateout.value = indate.format("DD MMM YYYY","ru");
	});
	minus.addEventListener("click", function(event){
		var days = field.querySelector("#day-counter").value;
		if(days==0){
			return;
		}
		days = Number(days) - 1;
		var indate = field.querySelector("#datein").value;
		indate = moment(indate,"DD MMM YYYY","ru");
		indate.add(days,"day");
		dateout.value = indate.format("DD MMM YYYY","ru");
	});
}








//counter
for(var i = 0; i < displays.length; i++){
	display = displays[i];
	display.classList.remove("no-js");	
	display.classList.add("js");
}

for(var i = 0; i < elements.length; i++){
	var parent = elements[i];
	initNumberField(parent);
}

function initNumberField(parent){
	var minus = parent.querySelector(".icon-minus");
	var plus = parent.querySelector(".icon-plus");
	var input = parent.querySelector(".counter__input");
	minus.addEventListener("click", function(event){
		event.preventDefault();
		changeNumber(false);
	});
	plus.addEventListener("click", function(event){
		event.preventDefault();
		changeNumber(true);
	});
	function changeNumber(operation){
		var value = Number(input.value);
		if(isNaN(value)){
			value = 1;
		} else if(value < 0){
			value = 1;
		}
		if(operation){
			input.value = value + 1; 
		} else if(value == 0){
			input.value = value;
		} else{
			input.value = value - 1;
		}
	}
}
//add traveler
var travelers = document.querySelector("#travelers").innerHTML;
var inputCounter = document.querySelector("#counter");
var field = document.querySelector(".hotel-form__travelers-wrap");
var count = Number(inputCounter.value);
var block = document.querySelector("#travelers-counter");
var minus = block.querySelector(".icon-minus");
var plus = block.querySelector(".icon-plus");
minus.addEventListener('click', function() {
	event.preventDefault();
	var count = Number(inputCounter.value);
	deleteTraveler(count);
});
plus.addEventListener('click', function() {
	event.preventDefault();
	var count = Number(inputCounter.value);
	makeTraveler(count);
});

function makeTraveler(count) {
	for (var i = 0; i <= count; i++) {
		var id = "number-" + i;
		var row = document.createElement("div");
		row.classList.add("travelers");
		row.id = id;
		var html = Mustache.render(travelers, {
		"number": i
		});
		row.innerHTML = html;
	  }
	  field.appendChild(row);
}
function deleteTraveler(count) {
	var id = "number-" + (count + 1);
	element = document.getElementById(id);
	if (element) {
		element.remove();
	}
}



//ajax
var form = document.querySelector(".hotel-form");
var popup = document.querySelector(".popup-ok");
var btn = popup.querySelector(".popup-ok__btn");
btn.addEventListener("click", function(){
	event.preventDefault();
	popup.classList.toggle("popup-ok--hidden");
})

form.addEventListener("submit",function(){
	event.preventDefault();
	var data = new FormData(form);
	var xhr = new XMLHttpRequest();
	xhr.open("post", "https://echo.htmlacademy.ru/adaptive");
	xhr.addEventListener("readystatechange", function(){
		if(xhr.readyState == 4){
			console.log(xhr.responseText);
			popup.classList.toggle("popup-ok--hidden");
		}
	});
	xhr.send(data);
});



// gallery

var area = form.querySelector(".gallery__list"); 
var template = document.querySelector(".image-template").innerHTML;
var queue = []; 
form.addEventListener("submit", function(event) {
	event.preventDefault(); 
	var data = new FormData(form); 
	queue.forEach(function(element) { 
		data.append("images", element.file); 
	 });
	// request(data, function(response) {
	// 	console.log(response); 
	// });	
}); 

function removePreview(li) {
	queue = queue.filter(function(element) {
		return element.li != li; 
	});
	li.parentNode.removeChild(li); 
} 
// function request(data, fn) { … } 
form.querySelector("#upload_photo").addEventListener("change", function() {
	var files = this.files;
	console.log("files");
	for (var i = 0; i < files.length; i++) {
		preview(files[i]);
	}
}); 

function preview(file) {
	var reader = new FileReader(); 
	reader.addEventListener("load", function(event) { 
		var html = Mustache.render(template, { 
			"image": event.target.result,
			"name": file.name
		});
		var li = document.createElement("li");
		li.classList.add("gallery__item");
		li.innerHTML = html;
    	area.appendChild(li); 
    	li.querySelector(".gallery__del-img").addEventListener("click", function(event) {
    		event.preventDefault();
    		removePreview(li);
    	});
    	queue.push({
    		"file": file,
    		"li": li
    	});

	});
	reader.readAsDataURL(file);  	
}

