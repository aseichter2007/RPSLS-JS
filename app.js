"use strict";
 
class Game{
    constructor(){
        this.player1;
        this.player2;
        this.maxScore;
        this.gestureOptions = ["rock", "paper", "scissors", "lizard", "spock"]//this could probably be built from actul gesture objects to be suer fancy.
    }

    setupGame(){
        let players = Helper.promptFor("How many players?")
        if (players === "1") {
            this.player1 = new Human(this.gestureOptions);
            this.player2 = new AI(this.gestureOptions);
        }
        else if (players === "2") {
            this.player1 = new Human(this.gestureOptions);
            this.player2 = new Human(this.gestureOptions);
        } else {
            this.setupGame()
        }
        let topscore = Helper.promptFor("How many points to win?")
        let parsed = this.tryParseInt(topscore, 0) 
        if (parsed !== 0) {
            this.maxScore = parsed;
        }
    }

    runGame(){
        do {
            let p1throw =  this.player1.throw();
            let p2throw = this. player2.throw()
            let winner = Comparator.compare(p1throw, p2throw);
            if (winner[0] === 1) {
                //console.log(winner[0]);
                this.player1.score++;
                //console.log(this.player1.name + " won the round. " + winner[1]);
                Helper.printOut(this.player1.name + " won the round. " + winner[1]);
            } else if (winner[0]===2) {
                //console.log(winner[0]);
                this.player2.score++;
                //console.log(this.player2.name + " won the round. " + winner[1]);
                Helper.printOut(this.player2.name + " won the round. " + winner[1]);

            } else {
                //console.log("TIE!");
                Helper.printOut("TIE!")
            }             
        } while (this.player1.score < this.maxScore && this.player2.score < this.maxScore);
        this.DeclareWinner();
    }
    DeclareWinner(){
        if (this.player1.score > this.player2.score) {
            //console.log(this.player1.name + " wins the competition!");
            Helper.printOut(this.player1.name + " wins the competition!");
        } else if (this.player2.score > this.player1.score) {
            //console.log(this.player2.name + " wins the competition!");
            Helper.printOut(this.player2.name + " wins the competition!");
        } else {
            console.error("its... a tie somehow.  contact the developer of this application.")
        } 
    }

    tryParseInt(str,defaultValue) {//I stole this code block from https://pietschsoft.com/post/2008/01/14/javascript-intTryParse-equivalent
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
    throw(){
        console.error("Error: this method should be overridden")
    }

}

class Human extends Player{
    constructor(gestureOptions){
        super(Helper.promptFor("enter player name"), gestureOptions)
    }
    throw(){
        let message = "";
        for (let index = 1; index < this.gestureOptions.length+1; index++) {
            const element = this.gestureOptions[index-1];
            message += index+". "+element + "\n"
        }        
        let choice = Helper.promptFor(this.name + " choose a gesture\n" + message)
        
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
                return this.throw();
                break;
        }
    }
}

class AI extends Player{
    constructor(gestureOptions){
        super("placeholder", gestureOptions)
        this.name = this.chooseName();
    }
    chooseName(){
        let names = ["Mike Terrill", "Mike Heinisch", "Brett Johnson", "Charles King", "David Lagrange", "Nevin Seibel", "Tony Seichter"]
        let random = this.getRandomInteger(0, names.length)
        return names[random];
    }
    getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;//call the cops! I stole this off w3 schools!
    }
    throw(){
        let rand = this.getRandomInteger(0, this.gestureOptions.length);
        return this.getGesture(this.gestureOptions[rand]);
    }
    getGesture(gesture){//probably should be passing a number but w/e.  Dynamic switch would be fancy.
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

    static compare(gesture1, gesture2){
        let compareLength = 2;
        let win1 = 1;
        let win2 = 2;
        let noWin = 0;
        for (let index = 0; index < compareLength; index++) {
            let opponentThrowName = gesture1.gestureBeats[index][0];
            if (opponentThrowName === gesture2.gestureName) {
                return [win1, gesture1.gestureName + " " + gesture1.gestureBeats[index][1] + " " + opponentThrowName]; 
            }
        }
        for (let index = 0; index < compareLength; index++) {
            let opponentThrowName = gesture2.gestureBeats[index][0];
            if (opponentThrowName === gesture1.gestureName) {
                return [win2, gesture2.gestureName + " " + gesture2.gestureBeats[index][1] + " " + opponentThrowName]; 
            }
        }      
        return [noWin]     
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
class Helper{

    static promptFor(output) {
    console.log(output)
    return prompt(output);
        }
    static printOut(string){
    console.log(string);
    alert(string)
    }
}

class Program{
    static start() {    
        var game = new Game();
        game.setupGame();
        game.runGame();
        }
}

Program.start();