function make_stats() {
    $(".stats").html(`
        <div class="row">
            <div class="col s4">
                <div class="card">
                    <div class="card-content">
                        <p class="stat">STR</p>
                        <p id="STR" style="cursor:default;">0</p>
                        <input type="text" id="I_STR" class="input-field" style="display: none;">
                    </div>
                </div>
            </div>
            <div class="col s4">
                <div class="card">
                    <div class="card-content">
                        <p class="stat">DEX</p>
                        <p id="DEX" style="cursor:default;">0</p>
                        <input type="text" id="I_DEX" class="input-field" style="display: none;">
                    </div>
                </div>
            </div>
            <div class="col s4">
                <div class="card">
                    <div class="card-content">
                        <p class="stat">CON</p>
                        <p id="CON" style="cursor:default;">0</p>
                        <input type="text" id="I_CON" class="input-field" style="display: none;">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s4">
                <div class="card">
                    <div class="card-content">
                        <p class="stat" style="cursor:default;">INT</p>
                        <p id="INT" style="cursor:default;">0</p>
                        <input type="text" id="I_INT" class="input-field" style="display: none;">
                    </div>
                </div>
            </div>
            <div class="col s4">
                <div class="card">
                    <div class="card-content">
                        <p class="stat" style="cursor:default;">WIS</p>
                        <p id="WIS" style="cursor:default;">0</p>
                        <input type="text" id="I_WIS" class="input-field" style="display: none;">
                    </div>
                </div>
            </div>
            <div class="col s4">
                <div class="card">
                    <div class="card-content">
                        <p class="stat" style="cursor:default;">CHA</p>
                        <p id="CHA" style="cursor:default;">0</p>
                        <input type="text" id="I_CHA" class="input-field" style="display: none;">
                    </div>
                </div>
            </div>
        </div>
   `);
    let stats = localStorage.getItem("stats");
    if (stats) {
        stats = JSON.parse(stats);
    } else {
        stats = {
            STR: 10,
            DEX: 10,
            CON: 10,
            INT: 10,
            WIS: 10,
            CHA: 10
        };
        localStorage.stats = JSON.stringify(stats);
    }
    for (let i in stats) {
        let $stat = $("#" + i);
        $stat.html(calculate_stats(stats[i]));
        $stat.on("dblclick", function (event) {
            event.preventDefault();
            $(this).css("display", "none");
            $("#I_" + $(this).attr("id")).fadeIn("fast").focus().on("keyup", function (event) {
                event.preventDefault();
                if (event.which === 13) {
                    let number = $(this).val();
                    if (!isNaN(number) && number >= 1 && number <= 100) {
                        stats[$(this).attr("id").slice(-3)] = number;
                        localStorage.stats = JSON.stringify(stats);
                    }
                    recalculate_stats();
                    $(this).css("display", "none");
                    $("#" + $(this).attr("id").slice(-3)).fadeIn("fast");
                }
            }).on("focusout", function (event) {
                event.preventDefault();
                let number = $(this).val();
                if (!isNaN(number) && number >= 1 && number <= 100) {
                    stats[$(this).attr("id").slice(-3)] = number;
                    localStorage.stats = JSON.stringify(stats);
                }
                recalculate_stats();
                $(this).css("display", "none");
                $("#" + $(this).attr("id").slice(-3)).fadeIn("fast");
            });
        });
    }
    $(".stat").css("cursor", "pointer").on("click", function (event) {
        event.preventDefault();
        let number = calculate_stats(get_stat($(this).html()));
        $("#dice").val($(this).html());
        calculate("1d20 + " + number + " ; 1d20 + " + number);
    });
}

function recalculate_stats() {
    let stats = localStorage.getItem("stats");
    if (stats) {
        stats = JSON.parse(stats);
        for (let i in stats) {
            $("#" + i).html(calculate_stats(stats[i]));
        }
    }
}

function calculate_stats(stat) {
    return Math.floor((parseInt(stat) - 10) / 2);
}

function get_stat(stat) {
    let stats = localStorage.getItem("stats");
    if (stats) {
        stats = JSON.parse(stats);
        return stats[stat];
    }
}