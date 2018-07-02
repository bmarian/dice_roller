function register_roll(dices, math_res){
	let roll = $("#dice").val();
	let rolls_history = sessionStorage.getItem("rolls_history");

	if(!rolls_history){
		rolls_history = [{
			roll : roll,
			dices : dices,
			math_res : math_res
		}];
	}else{
		rolls_history = JSON.parse(rolls_history);
		rolls_history.unshift({
			roll : roll,
			dices : dices,
			math_res : math_res
		});
	}

	sessionStorage.rolls_history = JSON.stringify(rolls_history);
	show_history();
}

function show_history(){
	let rolls_history = sessionStorage.getItem("rolls_history");
	if(rolls_history){
		rolls_history = JSON.parse(rolls_history);
		while(rolls_history.length > 10){ rolls_history.pop(); }

		let history = ""
		for(let i in rolls_history){
			history += 
			`
			<div class="row">
				<div class="col">
					<div class="card" style="text-align: center;">
					<p class="card-header">${rolls_history[i].roll}</p>
					<div class="card-body">
						<p>${rolls_history[i].dices}</p>
						<p>Total: ${rolls_history[i].math_res}</p>
					</div>
					</div>
				</div>
			</div>
			`;
		}

		$(".history").html(history);
	}
}