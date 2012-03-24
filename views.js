

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



var ObjView = Backbone.View.extend( {
    initialize: function(opt) {
        var self = this;
        this.paper = opt.paper
        console.log(toArray(arguments))
        if (!this.repr) { 
            this.repr = this.paper.rect(this.model.get('x'), this.model.get('y'), 50, 50);
            this.repr.attr("fill", "#ffffff");
            this.repr.attr("stroke", "#000000");
        }
        
        this.model.on('change:x', function(model,value) { self.repr.attr("x",value) })
        this.model.on('change:y', function(model,value) { self.repr.attr("y",value) })

    }
})


var VectViewArrow = Backbone.View.extend({

    initialize: function(opt) {
        this.paper = opt.paper
        var self = this;
        var host = this.model.get('host')
        
        this.render()

        host.on('change:x', function() { self.render() })
        host.on('change:y', function() { self.render() })

        this.model.on('change:x', function() { self.render() })
        this.model.on('change:y', function() { self.render() })
    },

    render: function() {
        var host = this.model.get('host')
        var cto = host.add(this.model)

        var pathdata = { x1: host.x(), y1: host.y(), x2: cto.x(), y2: cto.y()}
        if (!this.repr) {
            this.repr = paper.arrow(pathdata)
        } else {
            this.repr.repos(pathdata)
        }

    }
})




var VectView = Backbone.View.extend({

    initialize: function(opt) {
        this.paper = opt.paper
        var self = this;
        var host = this.model.get('host')
        
        this.render()

        host.on('change:x', function() { self.render() })
        host.on('change:y', function() { self.render() })

        this.model.on('change:x', function() { self.render() })
        this.model.on('change:y', function() { self.render() })
    },

    render: function() {
        var host = this.model.get('host')
        var cto = host.add(this.model)

        var pathdata = [ [ "M", host.x(), host.y() ], [ "L" , cto.x(), cto.y() ] ]
        if (!this.repr) {
            this.repr = paper.path()
        }

        var pathParams = { stroke: '#ff0000', "stroke-width": 1 }
        this.repr.attr(_.extend({path: pathdata }, pathParams))
    }
})








