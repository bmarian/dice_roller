$(function () {
    $(".roll").on("click", function (e) {
        let dices = $("#dice").val();
        if (dices !== "" && dices != null) {
            calculate(dices);
        }

    });
    $("#dice").on("keydown", function (e) {
        if (e.which === 13) {
            let dices = $("#dice").val();
            if (dices !== "" && dices != null) {
                calculate(dices);
            }
        }
        if (e.which === 38) {
            e.preventDefault();
            load_history_up();
        }
        if (e.which === 40) {
            e.preventDefault();
            load_history_down();
        }
    });
    $(".history").on("click", function (event) {
        let ev = $(event.target).attr("roll");
        if (ev) {
            calculate_from_history(ev);
            $("#dice").focus();
        }
    });
    show_history();
    make_stats();
});

function load_history_up() {
    let rolls_history = localStorage.getItem("rolls_history");
    if (rolls_history) {
        rolls_history = JSON.parse(rolls_history);

        let $dices = $("#dice");
        let val = parseInt($dices.attr("history"));
        if (val < rolls_history.length - 1) {
            $dices.attr("history", val + 1);
            $dices.val(rolls_history[parseInt($dices.attr("history"))].roll);
        }
    }
}

function load_history_down() {
    let rolls_history = localStorage.getItem("rolls_history");
    if (rolls_history) {
        rolls_history = JSON.parse(rolls_history);

        let $dices = $("#dice");
        let val = parseInt($dices.attr("history"));
        if (val > 0) {
            $dices.attr("history", val - 1);
            $dices.val(rolls_history[parseInt($dices.attr("history"))].roll);
        }
    }
}