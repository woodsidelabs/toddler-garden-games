var testCard = null;
var matchCount = 0;
var clickLock = 0;

function shuffleArray(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !==0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function shuffle() {
	var allcards = document.getElementsByClassName("memorycard-img");
	var i;
	var rndcards = [];
	for (i = 0; i < allcards.length; i++) {
		rndcards[i] = Math.floor(i/2)+1;
	}
	rndcards = shuffleArray(rndcards);
	for (i = 0; i < allcards.length; i++) {
		console.log(""+i+":"+allcards[i].id);
		allcards[i].alt = ""+rndcards[i];
		//allcards[i].addEventListener("click", MemoryCards, false);
	}
}

function MemoryCards(e) {
	console.log(e);
	console.log(e.target);
	var imgsrc = e.target.src;
	if (e.target.alt === 'match') { return; }
	if (clickLock > 0) { return; }
	if (imgsrc.endsWith("card.png")) {
		if (testCard == null) {
			testCard = e.target;
			document.getElementById("status").innerText = testCard.id;
			e.target.src = "img/"+e.target.alt+".png";
		} else {
			document.getElementById("status").innerText = testCard.id;
			e.target.src = "img/"+e.target.alt+".png";
			if (e.target.alt === testCard.alt) {
				console.log('match!');
				testCard.alt = 'match';
				e.target.alt = 'match';
				testCard = null;
				document.getElementById("status").innerText = 'Match! Good job!';clickLock=1;
				matchCount = matchCount + 2;
				if (matchCount >= 16) {
					document.getElementById("status").innerHTML = 'You did it! Great work! <a href="memory.html">Play again?</a>';
					return;
				}
				setTimeout(() => { document.getElementById("status").innerText = '';clickLock=0; }, 1000);
			} else {
				console.log('no match');
				document.getElementById("status").innerText = 'No match, try again!';clickLock=1;
				setTimeout(() => { document.getElementById("status").innerText = '';testCard.src = 'img/card.png';e.target.src='img/card.png';testCard=null;clickLock=0; }, 1000);
			}
		}
	} else {
		e.target.src = "img/card.png";
		testCard = null;
		document.getElementById("status").innerText = "";
	}
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
		//document.getElementById("card_1_1").addEventListener("click", MemoryCards, false);
		var allcards = document.getElementsByClassName("memorycard-img");
		var i;
		for (i = 0; i < allcards.length; i++) {
			allcards[i].addEventListener("click", MemoryCards, false);
		}
		shuffle();
    }
};

app.initialize();
