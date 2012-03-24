

Raphael.fn.arrow = function (attr) {

    var paper = this;

    function arrow(attr) {
        this.attr = _.extend({ x1: 0, y1: 0, x2: 100, y2: 100, size: 3, fill: "red"}, attr)
        this.render()
    }

    arrow.prototype.render = function() {
        var x1 = this.attr.x1,x2 = this.attr.x2,y1 = this.attr.y1,y2 = this.attr.y2, size = this.attr.size

        if ((x1 == x2) && (y1 == y2)) { return }

        var angle = Math.atan2(x1-x2,y2-y1);
        angle = (angle / (2 * Math.PI)) * 360;

        if (this.arrowPath) { this.arrowPath.remove() }
        if (this.linePath) { this.linePath.remove() }

        this.arrowPath = paper.path("M" + x2 + " " + y2 + " L" + (x2 - size) + " " + (y2 - size) + " L" + (x2 - size) + " " + (y2 + size) + " L" + x2 + " " + y2 ).attr({"fill":this.attr.fill, "stroke": this.attr.fill }).rotate((90+angle),x2,y2);
        this.linePath = paper.path("M" + x1 + " " + y1 + " L" + x2 + " " + y2).attr({"stroke":this.attr.fill});
    }

    arrow.prototype.repos = function(attr) {
        this.attr = _.extend(this.attr,attr)
        this.render()
    }

    return new arrow(attr)
}
