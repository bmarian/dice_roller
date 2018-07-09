function calculate(dices) {

    //Convert [DEX] to [1d20 + DEX ; 1d20 + DEX]
    dices = dices.replace(/STR|DEX|CON|INT|WIS|CHA/gim, function (dice_string) {
        let number = $("#" + dice_string).html();
        return "1d20 + " + number + " ; 1d20 + " + number;
    });

    // Converts [ d20] to [1d20]
    dices = dices.replace(/[^0-9]d\d+/gim, function (dice_string) {
        let dice_str = dice_string[0] + "1" + dice_string.slice(1, dice_string.length);
        return dice_str;
    });

    // Converts [d20] to [1d20]
    dices = dices.replace(/^d\d+/gim, function (dice_string) {
        let dice_str = "1" + dice_string;
        return dice_str;
    });

    //Convert [2d20dl1] to [max(random(1,20) , random(1,20))]
    dices = dices.replace(/(\d+)(d)(\d+)(dl)(\d+)/gim, function (dice_string) {
        dice_string = dice_string.replace("d", " ").replace("dl", " ").split(" ");
        let dice = new Dice(dice_string[0], dice_string[1]);
        return "(" + dice.drop_lowest(dice_string[2]) + ")";
    });

    //Convert [2d20d1] to [max(random(1,20) , random(1,20))]
    dices = dices.replace(/(\d+)(d)(\d+)(d)(\d+)/gim, function (dice_string) {
        dice_string = dice_string.replace("d", " ").replace("d", " ").split(" ");
        let dice = new Dice(dice_string[0], dice_string[1]);
        return "(" + dice.drop_lowest(dice_string[2]) + ")";
    });

    //Convert [2d20dh1] to [min(random(1,20) , random(1,20))]
    dices = dices.replace(/(\d+)(d)(\d+)(dh)(\d+)/gim, function (dice_string) {
        dice_string = dice_string.replace("d", " ").replace("dh", " ").split(" ");
        let dice = new Dice(dice_string[0], dice_string[1]);
        return "(" + dice.drop_highest(dice_string[2]) + ")";
    });

    //Convert [2d20] to [random(1,20) + random(1,20)]
    let dice_regx = /(\d+)(d)(\d+)/gim;
    dices = dices.replace(dice_regx, function (dice_string) {
        dice_string = dice_string.replace("d", " ").split(" ");
        let dice = new Dice(dice_string[0], dice_string[1]);
        return "(" + dice.convert_dice() + ")";
    });

    //Convert [)-] to [) -]
    dices = dices.replace(/[\(\)][\+\-\*\/]/gim, function (dice_string) {
        return dice_string[0] + " " + dice_string[1];
    });

    //Convert [-(] to [- (]
    dices = dices.replace(/[\+\-\*\/][\(\)]/gim, function (dice_string) {
        return dice_string[0] + " " + dice_string[1];
    });

    try {
        //Calculates the result of the generated expression
        let math_res = math.eval(dices);
        let show = dramatic_effect(dices);
        $(".result").html(`${(typeof math_res) !== "number" ? `${show}` : `Total: ${math_res} <br> ${show}`}`);
        register_roll(show, math_res);
    } catch (e) {
        console.log(e);
        $(".result").html("Wrong expression!");
    }
}

function calculate_from_history(dices) {
    $("#dice").val(dices);
    calculate(dices);
}

function dramatic_effect(dices, sound) {

    //Converts [1] to [<p red>1</p>]
    dices = dices.replace(/([^0-9])(1)([^0-9])/gim, function (dice_string) {
        return dice_string[0] + "<span class='red-text accent-4'>" + dice_string[1] + "</span>" + dice_string[2];
    });

    dices = dices.replace(/(^1)([^0-9])/gim, function (dice_string) {
        return "<span class='red-text accent-4'>" + dice_string[0] + "</span>" + dice_string[1];
    });

    dices = dices.replace(/([^0-9])(1$)/gim, function (dice_string) {
        return dice_string[0] + "<span class='red-text accent-4'>" + dice_string[1] + "</span>";
    });
    //Converts [20] to [<p green>20</p>]
    dices = dices.replace(/([^0-9])(20)([^0-9])/gim, function (dice_string) {
        return dice_string[0] + "<span class='teal-text darken-3'>" + dice_string[1] + dice_string[2] + "</span>" + dice_string[3];
    });

    dices = dices.replace(/(^20)([^0-9])/gim, function (dice_string) {
        console.log(dice_string);
        return "<span class='teal-text darken-3'>" + dice_string[0] + dice_string[1] + "</span>" + dice_string[2];
    });
    dices = dices.replace(/([^0-9])(20$)/gim, function (dice_string) {
        return dice_string[0] + "<span class='teal-text darken-3'>" + dice_string[1] + dice_string[2] + "</span>";
    });

    dices = dices.replace(/\;/gim, " | ");

    return dices;
}