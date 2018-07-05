class Dice {

    constructor(nr_of_dices, type_of_dice) {
        this.nr_of_dices = nr_of_dices;
        this.type_of_dice = type_of_dice;
    }

    convert_dice() {
        let result = "", dice_roll;
        for (let i = 0; i < this.nr_of_dices - 1; i++) {
            dice_roll = Math.floor((Math.random() * (this.type_of_dice)) + 1);
            result += dice_roll + " + ";
        }
        dice_roll = Math.floor((Math.random() * (this.type_of_dice)) + 1);
        result += dice_roll;
        return result;
    }

    drop_lowest(number_of_drops) {
        let result = "", dice_rolls = [];
        for (let i = 0; i < this.nr_of_dices; i++) {
            dice_rolls.push(Math.floor((Math.random() * (this.type_of_dice)) + 1));
        }

        dice_rolls.sort(function (a, b) {
            return a - b;
        });

        if (number_of_drops < dice_rolls.length) {
            for (let i = number_of_drops; i < dice_rolls.length - 1; i++) {
                result += dice_rolls[i] + " + ";
            }
            result += dice_rolls[dice_rolls.length - 1];
        } else {
            result = "0";
        }
        return result;
    }

    drop_highest(number_of_drops) {
        let result = "", dice_rolls = [];
        for (let i = 0; i < this.nr_of_dices; i++) {
            dice_rolls.push(Math.floor((Math.random() * (this.type_of_dice)) + 1));
        }

        dice_rolls.sort(function (a, b) {
            return b - a;
        });

        if (number_of_drops < dice_rolls.length) {
            for (let i = number_of_drops; i < dice_rolls.length - 1; i++) {
                result += dice_rolls[i] + " + ";
            }
            result += dice_rolls[dice_rolls.length - 1];
        } else {
            result = "0";
        }
        return result;
    }
}