


var WorldWindow = Point.extend4000({
    initialize: function(opt) {
        this.set(vectorize(this,'size',[100,100]))
        this.paper = opt.paper
    },

    translate: function(v) {
        return v.add(this).idiv(this.get('size'))
    }
})



var WorldChunk = Quad.extend4000({
    initialize: function() {
        
    }
})



var ThingView = Backbone.View.extend( {
    initialize: function(opt) {
        var self = this;
        this.paper = opt.paper
        console.log(toArray(arguments))
        
        var size = this.model.get('size');
        
        if (!this.repr) { 
            this.repr = this.paper.rect(this.model.get('x') - (size / 2), this.model.get('y')- (size / 2), size, size);
            this.repr.attr("fill", "#ffffff");
            this.repr.attr("stroke", "#000000");
        }
        
        this.model.on('change:x', function(model,value) { self.repr.attr("x",value - (size / 2)) })
        this.model.on('change:y', function(model,value) { self.repr.attr("y",value - (size / 2)) })

    }
})


var VectViewArrow = Backbone.View.extend({
    initialize: function(opt) {
        this.paper = opt.paper
        if (opt.color) { this.color = opt.color } else { this.color = "red" }
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
        var cto = host.add(this.model).mul(1.5)

        var pathdata = { x1: host.x(), y1: host.y(), x2: cto.x(), y2: cto.y(), color: this.color}

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
        if (opt.color) { this.color = opt.color } else { this.color = "red" }
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

        var pathParams = { stroke: this.color, "stroke-width": 2 }
        this.repr.attr(_.extend({path: pathdata }, pathParams))
    }
})




