$(function(){
	$(".roll").on("click", function(e){
		let dices = $("#dice").val();
		if(dices != "" && dices != null)
			calculate(dices);
	});
	$("#dice").on("keyup", function(e){
		if(e.which == 13) {
			let dices = $("#dice").val();
			if(dices != "" && dices != null)
				calculate(dices);
		}
	});
	show_history();
});