"use strict";
 
class Game{
    constructor(){
        this.player1;
        this.player2;
        this.maxScore;
        this.gestureOptions = ["rock", "paper", "scissors", "lizard", "spock"]//this could probably be built from actul gesture objects to be suer fancy.
    }

    SetupGame(){
        let players = PromtFor("How many players?")
        if (players === "1") {
            this.player1 = new Human();
            this.player2 = new AI();
        }
        else if (players === "2") {
            this.player1 = new Human();
            this.player2 = new Human();
        } else {
            this.setupgame()
        }
        let topscore = PromptFor("How many points to win?")
        let parsed = this.TryParseInt(topscore, 0) 
        if (parsed !== 0) {
            this.maxScore = parsed;
        }
    }

    RunGame(){
        do {
            let p1throw =  this.player1.Throw();
            let p2throw = this. player2.Throw()
            let comparator = new Comparator(p1throw, p2throw);
            let winner = comparator.Compare();
            if (winner[0] === 1) {
                console.log(winner[0]);
                this.player1.score++;
                console.log(this.player1.name + " won the round");
            } else if (winner[0]===2) {
                console.log(winner[1]);
                this.player2.score++;
                console.log(this.player2.name + " won the round");
            } else {
                console.log("TIE!");
            }             
        } while (this.player1.score < this.maxScore || this.player2.score < this.maxScore);
        this.DeclareWinner();
    }
    DeclareWinner(){
        if (this.player1.score > this.player2.score) {
            console.log(this.player1.name + " wins the competition!");
        } else if (this.player2.score > this.player1.score) {
            console.log(this.player2.name + " wins the competition!");
        } else {
            console.log("its... a tie somehow.  contact the developer of this application.")
        } 
    }

    TryParseInt(str,defaultValue) {//I stole this code block from https://pietschsoft.com/post/2008/01/14/javascript-inttryparse-equivalent
        var retValue = defaultValue;
        if(str !== null) {
            if(str.length > 0) {
                if (!isNaN(str)) {
                    retValue = parseInt(str);
                }
            }
        }
        return retValue;
    }
}

class Player{
    constructor(name, gestureOptions){
        this.name = name;
        this.score = 0;
        this.gestureOptions = gestureOptions;
    }
    Throw(){
        console.log("Error: this method should be overridden")
    }

}

class Human extends Player{
    constructor(gestureOptions){
        super(PromtFor("enter player name"), gestureOptions)
    }
    Throw(){
        let message = "";
        for (let index = 1; index < this.gestureOptions.length+1; index++) {
            const element = this.gestureOptions[index];
            message += i+". "+element + "\n"
        }        
        let choice = PromtFor(this.name + " choose a gesture\n" + message)
        
        switch (choice) {//ideally a dynamic switch could handle new gesture options but I dont know how to dynamic switch.
            case "1":
                return new Rock();
            case "2":
                return new Paper();
            case "3":
                return new Scissors();
            case "4":
                return new Lizard();
            case "5":
                return new Spock();        
            default:
                return this.Throw();
                break;
        }
    }
}

class AI extends Player{
    constructor(gestureOptions){
        super(this.ChooseName(), gestureOptions)
    }
    ChooseName(){
        let names = ["Mike Terrill", "Mike Heinisch", "Brett Johnson", "Charles King", "David Lagrange", "Nevin Seibel", "Tony Seichter"]
        let random = this.GetRandomInteger(0, names.length)
    }
    GetRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;//call the cops! I stole this off w3 schools!
    }
    Throw(throws){
        let rand = this.GetRandomInteger(0, throws.length);
        return this.GetGesture(throws[rand]);
    }
    GetGesture(gesture){//probably should be passing a number but w/e.  Dynamic switch would be fancy.
        switch (gesture) {
            case this.gestureOptions[0]:
                return new Rock();
            case this.gestureOptions[1]:
                return new Paper();
            case this.gestureOptions[2]:
                return new Scissors();
            case this.gestureOptions[3]:
                return new Lizard();
            case this.gestureOptions[4]:
                return new Spock();
            default:
                return this.throws();
                break;
        }
    }
}

class Comparator{
    constructor(gesture1, gesture2){
        this.gesture1 = gesture1;
        this.gesture2 = gesture2;
    }

    Compare(){
        for (let index = 0; index < 2; index++) {
            const element = this.gesture1.gestureBeats[index][0];
            if (element === this.gesture2.gestureName) {
                return [1,this.gesture1.gestureName + " " + this.gesture1.gestureBeats[index][1] + " " + element]; 
            }
        }
        for (let index = 0; index < 2; index++) {
            const element = this.gesture2.gestureBeats[index][0];
            if (element === this.gesture1.gestureName) {
                return [2,this.gesture2.gestureName + " " + this.gestur2.gestureBeats[index][1] + " " + element]; 
            }
        }           
    }       
}

class Gesture{
    constructor(gestureName, gestureBeats){
        this.gestureName = gestureName;
        this.gestureBeats = gestureBeats;
    }
}
class Rock extends Gesture{
    constructor(){
        super("rock", [["scissors", "crushes"],["lizard", "crushes"]]);
    }
}
class Paper extends Gesture{
    constructor(){
        super("paper", [["rock", "covers"],["spock", "disproves"]]);
    }
}
class Scissors extends Gesture{
    constructor(){
        super("scissors", [["paper", "cuts"], ["lizard", "decapitates"]])
    }
}
class Lizard extends Gesture{
    constructor(){
        super("lizard", [["spock", "poisons"], ["paper", "eats"]])
    }
}
class Spock extends Gesture{
    constructor(){
        super("spock", [["rock", "crushes"],["scissors", "smashes"]])
    }
}

function PromtFor(output) {
    console.log(output)
    return prompt(output);
}
function PrintOut(string){
    console.log(string);
    alert(string)
}

var game = new Game();
game.setupgame();
game.RunGame();