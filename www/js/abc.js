var testCard = null;
var matchCount = 0, targetNumber = -1, targetHint;
var topRowCard = null, middleRowCard = null, bottomRowCard = null;
console.log(navigator.vendor);

// speak in browser: https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
function textToSpeech(speakStr, doShuffle) {
	TTS.speak({ text: speakStr, locale: 'en-US' });
	/* if (chrome)
	var msg = new SpeechSynthesisUtterance();
	var voices = window.speechSynthesis.getVoices();
	msg.voice = voices[10]; // Note: some voices don't support altering params
	msg.voiceURI = 'native';
	msg.volume = 1; // 0 to 1
	msg.rate = 1; // 0.1 to 10
	msg.pitch = 2; //0 to 2
	msg.text = 'Hello World';
	msg.lang = 'en-US';

	msg.onend = function(e) {
	  console.log('Finished in ' + event.elapsedTime + ' seconds.');
	};

    speechSynthesis.speak(msg);
    */
}

var abcWords = {
  "1_1": "Apple",
  "1_2": "Airplane",
  "1_3": "Ant",
  "2_1": "Balloon",
  "2_2": "Ball",
  "2_3": "Bat",
  "3_1": "Cake",
  "3_2": "Cat",
  "3_3": "Car",
  "4_1": "Dog",
  "4_2": "Duck",
  "4_3": "Drum",
  "5_1": "Egg",
  "5_2": "Elephant",
  "5_3": "Eyes",
  "6_1": "Fan",
  "6_2": "Fish",
  "6_3": "Frog",
  "7_1": "Guitar",
  "7_2": "Giraffe",
  "7_3": "Gumball",
  "8_1": "Horse",
  "8_2": "Hat",
  "8_3": "Heart",
  "9_1": "Ice cream",
  "9_2": "Igloo",
  "9_3": "Island",
  "10_1": "Jam",
  "10_2": "Jellybean",
  "10_3": "Juggler",
  "11_1": "Kangaroo",
  "11_2": "Key",
  "11_3": "Kite",
  "12_1": "Leaf",
  "12_2": "Lemon",
  "12_3": "Lollipop",
  "13_1": "Magnet",
  "13_2": "Mouse",
  "13_3": "Monkey",
  "14_1": "Nest",
  "14_2": "Nose",
  "14_3": "Necktie",
  "15_1": "Owl",
  "15_2": "Octopus",
  "15_3": "Orange",
  "16_1": "Panda",
  "16_2": "Paint",
  "16_3": "Potato",
  "17_1": "Queen",
  "17_2": "Quilt",
  "17_3": "Question mark",
  "18_1": "Rabbit",
  "18_2": "Rainbow",
  "18_3": "Rhinceros",
  "19_1": "Sailboat",
  "19_2": "Sandwich",
  "19_3": "Sun",
  "20_1": "Tent",
  "20_2": "Truck",
  "20_3": "Tree",
  "21_1": "Umbrella",
  "21_2": "Unicorn",
  "21_3": "Uniform",
  "22_1": "Violin",
  "22_2": "Violet",
  "22_3": "Vase",
  "23_1": "Walrus",
  "23_2": "Walnut",
  "23_3": "Watermelon",
  "24_1": "Xylophone",
  "24_2": "X-ray",
  "24_3": "X-ray",
  "25_1": "Yarn",
  "25_2": "Yellow",
  "25_3": "Yarn",
  "26_1": "Zebra",
  "26_2": "Zoo",
  "26_3": "Zipper"
};

// return random number between 1 and x
function randomRange(x) {
	return Math.floor((Math.random() * x) + 1);
}

function shuffle() {
	if (topRowCard!==null) {
		topRowCard.src = 'img/blank100.png'; middleRowCard.src = 'img/blank100.png'; bottomRowCard.src = 'img/blank100.png';
		topRowCard.alt = 'blank'; middleRowCard.alt = 'blank'; bottomRowCard.alt = 'blank';
		topRowCard = null; middleRowCard = null; bottomRowCard = null;
	}
	// set top row card
	topRowCard = document.getElementById("1_"+randomRange(3));
	topRowNumber = randomRange(26);
	topRowCard.src = 'img/letter_'+topRowNumber+'.png';
	topRowCard.alt = ""+topRowNumber;
	// set middle row card
	middleRowCard = document.getElementById("2_"+randomRange(3));
	do {
		middleRowNumber = randomRange(26);
	} while (middleRowNumber == topRowNumber);
	middleRowCard.src = 'img/letter_'+middleRowNumber+'.png';
	middleRowCard.alt = ""+middleRowNumber;
	// set bottom row card
	bottomRowCard = document.getElementById("3_"+randomRange(3));
	do {
		bottomRowNumber = randomRange(26);
	} while ((bottomRowNumber == topRowNumber)||(bottomRowNumber == middleRowNumber));
	bottomRowCard.src = 'img/letter_'+bottomRowNumber+'.png';
	bottomRowCard.alt = ""+bottomRowNumber;
	pickMe = randomRange(3);
	if (pickMe == 1) { targetNumber = topRowCard.alt; testCard = topRowCard; }
	if (pickMe == 2) { targetNumber = middleRowCard.alt; testCard = middleRowCard; }
	if (pickMe == 3) { targetNumber = bottomRowCard.alt; testCard = bottomRowCard; }
	var speakStr = "which one is "+String.fromCharCode(parseInt(targetNumber)+64)+" ?";
	TTS.speak({ text: speakStr, locale: 'en-GB' });
	document.getElementById("status").innerText = speakStr;
	targetHint = targetNumber+'_'+randomRange(3);
	var hintImg = 'img/hint_'+targetHint+'.png';
	if (parseInt(targetNumber)<9) { document.getElementById("img_suggest").src = hintImg; }
	console.log(hintImg);
}

function MemoryCards(e) {
	console.log(e);
	console.log(e.target);
	console.log(e.target===testCard);
	if (e.target===testCard) {
		var speakStr = "Good job! "+String.fromCharCode(parseInt(targetNumber)+64)+" is for "+abcWords[targetHint];//"which one is "+String.fromCharCode(parseInt(targetNumber)+64)+" ?";
		TTS.speak({ text: speakStr, locale: 'en-GB' });
		document.getElementById("status").innerText = speakStr;
		setTimeout(() => { document.getElementById("status").innerText = '';shuffle(); }, 3000);
		return;
	}
	if (e.target.alt!=='blank') {
		TTS.speak({ text: 'Sorry try again', locale: 'en-GB' });
		document.getElementById("status").innerText = 'Sorry, try again!';
		setTimeout(() => { document.getElementById("status").innerText = ''; }, 2000);
	}
	var imgsrc = e.target.src;
}

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
		var allcards = document.getElementsByClassName("memorycard-img");
		var i;
		for (i = 0; i < allcards.length; i++) {
			allcards[i].addEventListener("click", MemoryCards, false);
		}
		shuffle();
    }
};

app.initialize();
