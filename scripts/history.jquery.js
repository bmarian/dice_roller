function register_roll(dices, math_res) {
    let roll = $("#dice").val();
    let rolls_history = localStorage.getItem("rolls_history");

    if (!rolls_history) {
        rolls_history = [{
            roll: roll,
            dices: dices,
            math_res: math_res
        }];
    } else {
        rolls_history = JSON.parse(rolls_history);
        rolls_history.unshift({
            roll: roll,
            dices: dices,
            math_res: math_res
        });
    }

    localStorage.rolls_history = JSON.stringify(rolls_history);
    show_history();
}

function show_history() {
    let rolls_history = localStorage.getItem("rolls_history");
    if (rolls_history) {
        rolls_history = JSON.parse(rolls_history);
        while (rolls_history.length > 10) {
            rolls_history.pop();
        }

        let history = "";
        for (let i in rolls_history) {
            history +=
                `
			<!--<div class="row center-align">-->
				<div class="col s12 m12">
					<div class="card">
					<div class="card-content">
                        <p class="card-title" roll="${rolls_history[i].roll}" style="cursor: pointer;">
                            ${rolls_history[i].roll.replace(/\;/gim, " | ")}
                        </p>
                        <p>${(typeof rolls_history[i].math_res) !== "number" ? "" : `Total: ${rolls_history[i].math_res}`}</p>
                        <p>${rolls_history[i].dices}</p>
                    </div>
					</div>
				</div>
			<!--</div>-->
			`;
        }
        $(".history").html(history);
    }
}