window.onload = function () {
    var remove = spinner("holder", 70, 120, 12, 25, "#fff");
    var form = {
        form: document.getElementsByTagName("form")[0],
        r1: document.getElementById("radius1"),
        r2: document.getElementById("radius2"),
        count: document.getElementById("count"),
        width: document.getElementById("width"),
        color: document.getElementById("color")
    };
    form.form.onsubmit = function () {
        remove();
        remove = spinner("holder", +form.r1.value, +form.r2.value, +form.count.value, +form.width.value, form.color.value);
        return false;
    };
};

function spinner(holderid, R1, R2, count, stroke_width, colour) {
    var sectorsCount = count || 12,
    color = colour || "#fff",
    width = stroke_width || 15,
    r1 = Math.min(R1, R2) || 35,
    r2 = Math.max(R1, R2) || 60,
    cx = r2 + width,
    cy = r2 + width,
    r = Raphael(holderid, r2 * 2 + width * 2, r2 * 2 + width * 2),
    
    sectors = [],
    opacity = [],
    beta = 2 * Math.PI / sectorsCount,

    pathParams = {stroke: color, "stroke-width": width, "stroke-linecap": "round"};
    Raphael.getColor.reset();
    for (var i = 0; i < sectorsCount; i++) {
        var alpha = beta * i - Math.PI / 2,
        cos = Math.cos(alpha),
        sin = Math.sin(alpha);
        opacity[i] = 1 / sectorsCount * i;
        sectors[i] = r.path([["M", cx + r1 * cos, cy + r1 * sin], ["L", cx + r2 * cos, cy + r2 * sin]]).attr(pathParams);
        if (color == "rainbow") {
            sectors[i].attr("stroke", Raphael.getColor());
        }
    }
    var tick;
    (function ticker() {
        opacity.unshift(opacity.pop());
        for (var i = 0; i < sectorsCount; i++) {
            sectors[i].attr("opacity", opacity[i]);
        }
        r.safari();
        tick = setTimeout(ticker, 1000 / sectorsCount);
    })();
    return function () {
        clearTimeout(tick);
        r.remove();
    };
}
