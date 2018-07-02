function calculate(dices){

	// Converts [d20] to [1d20]
	dices = dices.replace(/[^0-9]d\d+/gim, function(dice_string){
		let dice_str = dice_string[0] + "1" + dice_string.slice(1,dice_string.length);
		return dice_str;
	});

	//Convert [2d20dl1] to [max(random(1,20) , random(1,20))]
	dices = dices.replace(/(\d+)(d)(\d+)(dl)(\d+)/gim, function(dice_string){
		dice_string = dice_string.replace("d"," ").replace("dl"," ").split(" ");
		let dice = new Dice(dice_string[0], dice_string[1]);
		return "("+dice.drop_lowest(dice_string[2])+")";
	});

	//Convert [2d20d1] to [max(random(1,20) , random(1,20))]
	dices = dices.replace(/(\d+)(d)(\d+)(d)(\d+)/gim, function(dice_string){
		dice_string = dice_string.replace("d"," ").replace("d"," ").split(" ");
		let dice = new Dice(dice_string[0], dice_string[1]);
		return "("+dice.drop_lowest(dice_string[2])+")";
	});

	//Convert [2d20dh1] to [min(random(1,20) , random(1,20))]
	dices = dices.replace(/(\d+)(d)(\d+)(dh)(\d+)/gim, function(dice_string){
		dice_string = dice_string.replace("d"," ").replace("dh"," ").split(" ");
		let dice = new Dice(dice_string[0], dice_string[1]);
		return "("+dice.drop_highest(dice_string[2])+")";
	});

	//Convert [2d20] to [random(1,20) + random(1,20)]
	let dice_regx = /(\d+)(d)(\d+)/gim;
	dices = dices.replace(dice_regx, function(dice_string){
		dice_string = dice_string.replace("d"," ").split(" ");
		let dice = new Dice(dice_string[0],dice_string[1]);
		return "("+dice.convert_dice()+")";
	});

	//Convert [)-] to [) -]
	dices = dices.replace(/[\(\)][\+\-\*\/]/gim, function(dice_string){
		return dice_string[0] + " " + dice_string[1];
	});

	//Convert [-(] to [- (]
	dices = dices.replace(/[\+\-\*\/][\(\)]/gim, function(dice_string){
		return dice_string[0] + " " + dice_string[1];
	});

	try{
		//Calculates the result of the generated expresion
		let math_res = math.eval(dices);
		$(".result").html("Total: " + math_res + "<br>" + dices);
		register_roll(dices, math_res);
	}catch(e){
		console.log(e);
		$(".result").html("Wrong expresion!");
	}
}