"use strict";
 
class Game{
    constructor(){
        this.player1;
        this.player2;
        this.maxScore;
        this.gestureOptions = ["rock", "paper", "scissors", "lizard", "spock"]
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
    }

    RunGame(){
        do {
            
        } while (true);
    }

    GetGesture(gesture){
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
                break;
        }
    }
}

function PromtFor(output) {
    console.log(output)
    return prompt(output);
}

class Player{
    constructor(name){
        this.name = name;
        this.score = 0;
    }
    Throw(){
        console.log("Error: this method should be overridden")
    }

}

class Human extends Player{
    constructor(){
        super(PromtFor("enter player name"))
    }
    Throw(possiblethrows){
        let message = "";
        for (let index = 0; index < possiblethrows.length; index++) {
            const element = possiblethrows[index];
            message += i+". "+element + "\n"
        }
        
        let choice = PromtFor("Choose a gesture\n"+ message)
    }
}

class AI extends Player{
    constructor(){
        super()
    }
    ChooseName(){
        let names = ["Mike Terrill", "Mike Heinisch", "Brett Johnson", "Charles King", "David Lagrange", "Nevin Seibel", "Tony Seichter"]
        let random = this.GetRandomInteger(0, names.length)
    }
    GetRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;//call the cops! I stole this off w3 schools!
    }
    Throw(){

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

var game = new Game();
game.setupgame();
game.RunGame();