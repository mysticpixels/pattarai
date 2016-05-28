/*==================================================================
=            Refreshing and sharpening the JS artillery            =
==================================================================*/

/*=============================================
=            display date and time            =
=============================================*/

var printDay = function(){
	greetingSpan = document.querySelectorAll('h1 span'), timePlaceholder = document.querySelectorAll('h2'), date = new Date(), today = date.getDay(),
	days=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], greeting="", currentTime="";
	if (date.getHours() > 12)
		greeting="Good afternoon"
	if (date.getHours() < 12)
		greeting="Good Morning"
	if (date.getHours() > 16)
		greeting="Good Evening"
	currentTime=date.getHours();
	currentMins=date.getMinutes();
	greetingSpan[0].innerHTML=greeting + " Ranjith. Today is " + days[today];
	timePlaceholder[0].innerHTML= "Time is " + currentTime + ":" + currentMins;
};
/*=============================================
=            Random bg generator            =
=============================================*/

var randomBg = function(){
	var randomClasses=["black", "white", "orange", "yellow", "purple"];
	var classtoApply=randomClasses[Math.floor(Math.random() * (randomClasses.length - 0)) + 0];
	console.log(classtoApply);
	bodyElement.className=classtoApply;
};

/*=================================
=            palindrome            =
=================================*/
var palinCheck =  function(stringInput){
	event.preventDefault();
	var reversedString = stringInput.value.split("").reverse().join("");
	// if(validationMsg) stringInput.parentElement.removeChild(validationMsg);
	if(document.getElementById("positive")!=null){
		console.log(document.getElementById("positive").parentNode);
		document.getElementById("positive").parentElement.removeChild(document.getElementById("positive"));
	}
	if(document.getElementById("negative")!=null){
		console.log(document.getElementById("negative"));
		document.getElementById("negative").parentElement.removeChild(document.getElementById("negative"));
	}
	if (reversedString==stringInput.value){
		var validationMsg = document.createElement('span');
		var validationTxt = document.createTextNode("its a palindrome!");
		validationMsg.appendChild(validationTxt);
		validationMsg.className="positive";
		stringInput.parentNode.appendChild(validationMsg);
	}
	else{
		var validationMsg = document.createElement('span');
		var validationTxt = document.createTextNode("not a palindrome!");
		validationMsg.appendChild(validationTxt);
		validationMsg.className="negative";
		stringInput.parentNode.appendChild(validationMsg);
	}	
}

/*================================
=            triggers            =
================================*/
window.onload=function(){
	printDay();
	var  randomizer = document.querySelector("#randomizer"),
	palinInput = document.querySelector('#palinInput'),
	paliChkbtn = document.querySelector('#palinCheck');
	bodyElement = document.querySelector('body');
	randomizer.addEventListener('click', randomBg, 'false');
	paliChkbtn.addEventListener('click', function(){palinCheck(palinInput);}, 'false');
}