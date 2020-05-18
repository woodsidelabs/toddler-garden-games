var testCard = null;
var matchCount = 0, targetNumber = -1;
var topRowCard = null, middleRowCard = null, bottomRowCard = null;

// return random number between 1 and x
function randomRange(x) {
	return Math.floor((Math.random() * x) + 1);
}

function shuffle() {
	if (topRowCard!==null) {
		topRowCard.src = 'img/blank.png'; middleRowCard.src = 'img/blank.png'; bottomRowCard.src = 'img/blank.png';
		topRowCard.alt = 'blank'; middleRowCard.alt = 'blank'; bottomRowCard.alt = 'blank';
		topRowCard = null; middleRowCard = null; bottomRowCard = null;
	}
	// set top row card
	topRowCard = document.getElementById("1_"+randomRange(3));
	topRowNumber = randomRange(9);
	topRowCard.src = 'img/block_'+topRowNumber+'.png';
	topRowCard.alt = ""+topRowNumber;
	// set middle row card
	middleRowCard = document.getElementById("2_"+randomRange(3));
	do {
		middleRowNumber = randomRange(9);
	} while (middleRowNumber == topRowNumber);
	middleRowCard.src = 'img/block_'+middleRowNumber+'.png';
	middleRowCard.alt = ""+middleRowNumber;
	// set bottom row card
	bottomRowCard = document.getElementById("3_"+randomRange(3));
	do {
		bottomRowNumber = randomRange(9);
	} while ((bottomRowNumber == topRowNumber)||(bottomRowNumber == middleRowNumber));
	bottomRowCard.src = 'img/block_'+bottomRowNumber+'.png';
	bottomRowCard.alt = ""+bottomRowNumber;
	pickMe = randomRange(3);
	if (pickMe == 1) { targetNumber = topRowCard.alt; testCard = topRowCard; }
	if (pickMe == 2) { targetNumber = middleRowCard.alt; testCard = middleRowCard; }
	if (pickMe == 3) { targetNumber = bottomRowCard.alt; testCard = bottomRowCard; }
	document.getElementById("status").innerText = "which one is: "+targetNumber;
}

function MemoryCards(e) {
	console.log(e);
	console.log(e.target);
	console.log(e.target===testCard);
	if (e.target===testCard) {
		document.getElementById("status").innerText = "You found it! Good job!";
		setTimeout(() => { document.getElementById("status").innerText = '';shuffle(); }, 1000);
		return;
	}
	if (e.target.alt!=='blank') {
		document.getElementById("status").innerText = 'Sorry, try again!';
		setTimeout(() => { document.getElementById("status").innerText = ''; }, 1000);
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
