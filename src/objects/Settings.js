var Settings = (function() {

    var ul = document.createElement("UL");
    var style = ul.style;
    style.position = "absolute";
    style.right = "0px";
    style.bottom = "0px";
    style.color = "#FFF";
    style.margin = "16px";
    style.listStyle = "none";
    document.body.appendChild(ul);

    function addSetting(text, callback) {

        var li = document.createElement("LI");
        var label = document.createElement("LABEL");
        var input = document.createElement("INPUT");
        label.textContent = text;
        input.type = "checkbox";
        input.onclick = function() {
            GameStorage.set(text, input.checked);
            callback.call(input);
        }
        li.appendChild(input);
        li.appendChild(label);
        ul.appendChild(li);

        if (GameStorage.get(text, "true") === "true") {
            input.checked = true;
            callback.call(input, true);
        }

    }

    addSetting("music", function(init) {
        ENABLE_MUSIC = this.checked;
        if (!init) {
            musicLoop(currentMusic);
        }
    });

    addSetting("voice", function() {
        ENABLE_VOICE = this.checked;
    });

    return {
        ul: ul
    }

})();
