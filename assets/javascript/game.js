const word = {
    chosenWord: "",
    possibleWords: [
        "AIEEE!",
        "AIIEEE!",
        "ARRGH!",
        "AWK!",
        "AWKKKKKK!",
        "BAM!",
        "BANG!",
        "BANG-ETH!",
        "BIFF!",
        "BLOOP!",
        "BLURP!",
        "BOFF!",
        "BONK!",
        "CLANK!",
        "CLANK-EST!",
        "CLASH!",
        "CLUNK!",
        "CLUNK-ETH!",
        "CRRAACK!",
        "CRASH!",
        "CRRAACK!",
        "CRUNCH!",
        "CRUNCH-ETH!",
        "EEE-YOW!",
        "FLRBBBBB!",
        "GLIPP!",
        "GLURPP!",
        "KAPOW!",
        "KAYO!",
        "KER-SPLOOSH!",
        "KERPLOP!",
        "KLONK!",
        "KLUNK!",
        "KRUNCH!",
        "OOOFF!",
        "OOOOFF!",
        "OUCH!",
        "OUCH-ETH!",
        "OWWW!",
        "OW-ETH",
        "PAM!",
        "PLOP!",
        "POW!",
        "POWIE!",
        "QUNCKKK!",
        "RAKKK!",
        "RIP!",
        "SLOSH!",
        "SOCK!",
        "SPLATS!",
        "SPLATT!",
        "SPLOOSH!",
        "SWAAP!",
        "SWISH!",
        "SWOOSH!",
        "THUNK!",
        "THWACK!",
        "THWACKE!",
        "THWAPE!",
        "THWAPP!",
        "UGGH!",
        "URKKK!",
        "VRONK!",
        "WHACK!",
        "WHACK-ETH!",
        "WHAM-ETH!",
        "WHAMM!",
        "WHAMMM!",
        "WHAP!",
        "Z-ZWAP!",
        "ZAM!",
        "ZAMM!",
        "ZAMMM!",
        "ZAP!",
        "ZAP-ETH",
        "ZGRUPPP!",
        "ZLONK!",
        "ZLOPP!",
        "ZLOTT!",
        "ZOK!",
        "ZOWIE!",
        "ZWAPP!",
        "ZZWAP!",
        "ZZZZWAP!",
        "ZZZZZWAP!"
    ],
    chooseWord: function() {
        this.chosenWord = this.possibleWords[
            Math.floor(Math.random() * (this.possibleWords.length - 1))
        ];
    },
    getWord: function() {
        return this.chosenWord;
    }
};

const wins = {
    number: 0,
    addOne: function() {
        this.number++;
    },
    getNumber: function() {
        return this.number;
    }
};

const guesses = {
    number: 15,
    minusOne: function() {
        this.number = this.number - 1;
    },
    getNumber: function() {
        return this.number;
    },
    reset: function() {
        this.number = 15;
    }
};

const blanks = {
    blanks: "",
    mapHelper: function(a) {
        return a.match(/\w/) ? "_" : a;
    },
    createArray: function(chosenWord) {
        this.blanks = chosenWord
            .split("")
            .map(this.mapHelper)
            .join("");
    },
    getBlanks: function() {
        return this.blanks;
    }
};

const checkForWin = () => {
    if (word.getWord() === document.getElementById("chal").innerHTML) {
        document.getElementById("bigMessage").innerHTML = word.getWord();
        wins.addOne();
        console.log(wins.getNumber());
        document.getElementById("winNumber").innerHTML = wins.getNumber();
        game();
    } else if (guesses.getNumber() === 0) {
        document.getElementById("bigMessage").innerHTML = "You Loose! The Word Was: "+ word.chosenWord;

        game();
    }
};

const compareArrays = () => {
    document.getElementById("bigMessage").innerHTML = "Guess the Punchline!!!";
    var wordSoFar = document.getElementById("chal").innerHTML;
    var chosenWord = word.getWord();
    const guess = String.fromCharCode(event.keyCode).toUpperCase();
    document.getElementById("guessed").innerHTML =
        document.getElementById("guessed").innerHTML + guess;
    const truth = a => a === guess;
    var chosenWordSplit = chosenWord.split("");
    var wordSoFarSplit = wordSoFar.split("");
    if (chosenWordSplit.some(truth)) {
        document.getElementById("message").innerText = "You guessed Right!";
    } else {
        document.getElementById("message").innerText = "You guessed wrong.";
        guesses.minusOne();
        document.getElementById("guessNum").innerText = guesses.getNumber();
    }

    for (var i = 0; i < chosenWordSplit.length; i++) {
        if (chosenWordSplit[i] === guess) {
            wordSoFarSplit.splice(i, 1, guess);
        }
    }
    document.getElementById("chal").innerHTML = wordSoFarSplit.join("");
    checkForWin();
};

const game = () => {
    guesses.reset();
    document.getElementById("guessed").innerHTML = "";
    document.getElementById("guessNum").innerText = guesses.getNumber();
    document.getElementById("message").innerText =
        "Press Any Key to Start. . .";
    word.chooseWord();

    var chosen = word.getWord();
    console.log(chosen);
    blanks.createArray(chosen);
    let wordSoFar = blanks.getBlanks();
    document.getElementById("chal").innerHTML = wordSoFar;
};
