$(function () {
    let $monsters = $(".monsters");
    let $changes = $("#unsaved_changes");
    let $save_all_button = $("#save_all");
    load_all();

    $("#add").on("click", function () {
        $monsters.slideDown("fast");
        $(monster_card).appendTo($monsters).slideDown();
        $changes.fadeIn();
        $save_all_button.removeClass("disabled");

    });

    $("#remove_all").on("click", function () {
        $monsters.slideUp();
        $monsters.empty();
        $changes.fadeIn();
        $save_all_button.removeClass("disabled");
    });

    $save_all_button.on("click", function () {
        save_all($monsters, $changes, $(this));
    });

    $(window).keypress(function (event) {
        if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19))
            return true;
        else {
            if(!$save_all_button.hasClass("disabled")){
                event.preventDefault();
                $(event.target).blur();
                save_all($monsters, $changes, $save_all_button);
            }
            return false;
        }
    });

    $("#refresh").on("click", function () {
        load_all();
        $changes.fadeOut();
        $save_all_button.addClass("disabled");
    });

    $(".monsters").on("click", function (event) {
        let $button = $(event.target);
        if ($button.attr("id") === "monster_save") {
            $card = $button.parent().parent().parent().parent().parent().parent();
            save_monster($card);
            $changes.fadeIn();
            $save_all_button.removeClass("disabled");

        } else if ($button.attr("id") === "monster_discard") {
            $card = $button.parent().parent().parent().parent().parent().parent();
            $card.fadeOut("300", function () {
                $(this).remove();
            });
            $changes.fadeIn();
            $save_all_button.removeClass("disabled");
        }
    });

    $("input").on("keyup", function () {
        $changes.fadeIn();
        $save_all_button.removeClass("disabled");
    });
});

function save_all($monsters, $changes, $save_all_button) {
    $monsters.children().each(function () {
        save_monster($(this));
    });

    localStorage.monsters = $monsters.html();
    $changes.fadeOut();
    $save_all_button.addClass("disabled");
}

function load_all() {
    let $monsters = $(".monsters");
    let monsters = localStorage.getItem("monsters");
    if (monsters) {
        $monsters.html(monsters);
        $monsters.slideDown();
    }
}

function save_monster($card) {
    let $name = $card.find("#monster_name");
    let $hp = $card.find("#monster_max_hp");
    let $ac = $card.find("#monster_ac");
    let $str = $card.find("#monster_str");
    let $dex = $card.find("#monster_dex");
    let $con = $card.find("#monster_con");
    let $int = $card.find("#monster_int");
    let $wis = $card.find("#monster_wis");
    let $cha = $card.find("#monster_cha");

    $name.attr("value", $name.val());
    $hp.attr("value", $hp.val());
    $ac.attr("value", $ac.val());
    $str.attr("value", $str.val());
    $dex.attr("value", $dex.val());
    $con.attr("value", $con.val());
    $int.attr("value", $int.val());
    $wis.attr("value", $wis.val());
    $cha.attr("value", $cha.val());
}

const monster_card =
    `
    <div class="col s6" style="display: none;">
    <div class="card">
        <div class="card-content">

            <!-- Name -->
            <div class="row">
                <div class="col s12">
                    <div class="input-field inline">
                        <span style="font-size: 20px;">Name:</span>
                        <div class="input-field inline">
                            <input type="text" class="center-align" id="monster_name">
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <!-- HP -->
                <div class="col s6">
                    <span style="font-size: 20px;">HP:</span>
                    <div class="input-field inline" style="width: 80px;">
                        <input type="text" class="center-align" id="monster_max_hp">
                    </div>
                </div>
                <!-- AC -->
                <div class="col s6">
                    <span style="font-size: 20px;">AC:</span>
                    <div class="input-field inline" style="width: 80px;">
                        <input type="text" class="center-align" id="monster_ac">
                    </div>
                </div>
            </div>

            <!-- STATS -->
            <div class="row">
                <div class="col s4">
                    <span>STR:</span>
                    <div class="input-field inline" style="width: 35px;">
                        <input type="text" class="center-align" id="monster_str">
                    </div>
                </div>
                <div class="col s4">
                    <span>DEX:</span>
                    <div class="input-field inline" style="width: 35px;">
                        <input type="text" class="center-align" id="monster_dex">
                    </div>
                </div>
                <div class="col s4">
                    <span>CON:</span>
                    <div class="input-field inline" style="width: 35px;">
                        <input type="text" class="center-align" id="monster_con">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col s4">
                    <span>INT:</span>
                    <div class="input-field inline" style="width: 35px;">
                        <input type="text" class="center-align" id="monster_int">
                    </div>
                </div>
                <div class="col s4">
                    <span>WIS:</span>
                    <div class="input-field inline" style="width: 35px;">
                        <input type="text" class="center-align" id="monster_wis">
                    </div>
                </div>
                <div class="col s4">
                    <span>CHA:</span>
                    <div class="input-field inline" style="width: 35px;">
                        <input type="text" class="center-align" id="monster_cha">
                    </div>
                </div>
            </div>
            <!-- STATS -->

            <!-- Buttons -->
            <div class="row ">
                <ul>
                    <li class="col right">
                        <a class="waves-effect waves-light btn" id="monster_discard">Discard
                            <i class="material-icons left"  id="monster_discard">cancel</i>
                        </a>
                    </li>

                    <li class="col right" style="display:none;">
                        <a class="waves-effect waves-light btn" id="monster_save">Save
                            <i class="material-icons left" id="monster_save">save</i>
                        </a>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</div>
`;