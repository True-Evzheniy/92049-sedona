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
})
close.addEventListener("click",function(event){
	event.preventDefault();
	navigation.classList.toggle("navigation__list--close");
})





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
	})
	plus.addEventListener("click", function(event){
		event.preventDefault();
		changeNumber(true);
	})
	function changeNumber(operation){
		var value = Number(input.value);
		if(isNaN(value)){
			value = 1;
		} else if(value <= 0){
			value = 1;
		}
		if(operation){
			input.value = value + 1; 
		} else{
			input.value = value - 1;
		}
	}
}