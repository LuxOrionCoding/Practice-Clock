function initLocalClocks() {
	var date = new Date;
	var seconds = date.getSeconds() - 10;
	var minutes = date.getMinutes();
	var hours = date.getHours();

	var hands = [
		{
			hand: 'hours',
			angle: (hours*30) + (minutes/2)
		}, 
		{
			hand: 'minutes',
			angle: (minutes*6)
		}, 
		{
			hand: 'seconds',
			angle: (seconds*6)
		}
	];

	for (var i = 0; i < hands.length; i++) {
		var elements = document.querySelectorAll('.' + hands[i].hand);
		for (var j = 0; j < elements.length; j++) {
			elements[j].style.webkitTransform = `rotateZ(${hands[i].angle}deg)`;
			elements[j].style.transform = `rotateZ(${hands[i].angle}deg)`;
			if (hands[i].hand === 'minutes') {
				elements[j].parentNode.setAttribute('data-second-angle', hands[i + 1].angle);
			} else if (hands[i].hand === 'hours') {
				elements[j].parentNode.setAttribute('data-second-angle', hands[i + 1].angle);
			}
		}
	}

	setUpMinuteHands();
	moveSecondHands();
}


function setUpMinuteHands() {
	var containers = document.querySelectorAll('.minutes-container');
	var secondAngle = containers[0].getAttribute("data-second-angle");
	if (secondAngle > 0) {
		var delay = (((360 - secondAngle) / 6) + 0.1) * 1000;
		console.log(delay);
		setTimeout(()=>{
			moveMinuteHands(containers);
		}, delay);
	}
}

function moveMinuteHands(containers) {
	for (var i = 0; i < containers.length; i++) {
		containers[i].style.webkitTransform = 'rotateZ(6deg)';
		containers[i].style.transform = 'rotateZ(6deg)';
	}

	setInterval(()=>{
		for (var i = 0; i < containers.length; i++) {
			if (containers[i].angle === undefined) {
				containers[i].angle = 12;
			} else {
				containers[i].angle += 6;
			}

			containers[i].style.webkitTransform = `rotateZ(${containers[i].angle}deg)`;
			containers[i].style.transform = `rotateZ(${containers[i].angle}deg)`;
		}
	}, 60000);
}

function moveSecondHands() {
	moveHourHands();

	var containers = document.querySelectorAll('.seconds-container');
	setInterval(()=>{
		for (var i = 0; i < containers.length; i++) {
			if (containers[i].angle === undefined) {
				containers[i].angle = 6;
			} else {
				containers[i].angle += 6;
			}

			containers[i].style.webkitTransform = `rotateZ(${containers[i].angle}deg)`;
			containers[i].style.transform = `rotateZ(${containers[i].angle}deg)`;
		}
	}, 1000)
}

function moveHourHands() {
	var containers = document.querySelectorAll('.hours-container');
	setInterval(()=>{
		for (var i = 0; i < containers.length; i++) {
			if (containers[i].angle === undefined) {
				containers[i].angle = 12;
			} else {
				containers[i].angle += 6;
			}

			containers[i].style.webkitTransform = `rotateZ(${containers[i].angle}deg)`;
			containers[i].style.transform = `rotateZ(${containers[i].angle}deg)`;
		}
	}, 43200000);
}

initLocalClocks();




var root = document.querySelector(':root');
var themeChangeBtn = document.getElementById('theme-changer__checkbox');

var theClock = document.querySelector('.clock-container');

var secondsHand = document.querySelector('.seconds');
var minutesHand = document.querySelector('.minutes');
var hoursHand   = document.querySelector('.hours');
var clockHands  = [secondsHand, minutesHand, hoursHand];

function setRootProperty(propertyName, value) {
	return document.documentElement.style.setProperty(propertyName, value);
}

themeChangeBtn.addEventListener('click', ()=>{
	if (!themeChangeBtn.checked) {

		// Black Theme
		setRootProperty('--website-bg-clr', '#111');
		setRootProperty('--clock-bg', 'transparent');
		setRootProperty('--clock-clr', '#1f1f1f');
		setRootProperty('--clock-frame-clr', 'violet');
		setRootProperty('--seconds-clr', 'violet');
		setRootProperty('--minutes-clr', 'blueviolet');
		setRootProperty('--hours-clr', 'purple');
		setRootProperty('--font-clr', 'white');	

		theClock.style.boxShadow = "0 0 20px var(--clock-frame-clr)";

		secondsHand.style.boxShadow = "0 0 20px 2px var(--clr)";
		minutesHand.style.boxShadow = "0 0 20px 4px var(--clr)";
		hoursHand.style.boxShadow = "0 0 20px 4px var(--clr)";

	} else {

		// White Theme
		setRootProperty('--website-bg-clr', '#ddd');
		setRootProperty('--clock-bg', '#f3f3f3');
		setRootProperty('--clock-clr', '#bdbdbd');
		setRootProperty('--clock-frame-clr', 'black');
		setRootProperty('--seconds-clr', 'red');
		setRootProperty('--minutes-clr', 'black');
		setRootProperty('--hours-clr', 'black');
		setRootProperty('--font-clr', 'black');

		theClock.style.boxShadow = "13px 13px 18px rgba(0, 0, 0, 0.431)";

		clockHands.forEach(hand => { hand.style.boxShadow = 'none'; });

	}
})
	