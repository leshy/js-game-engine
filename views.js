


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
        if (!this.repr) { 
            var size = this.model.get('size');
            this.repr = this.paper.rect(this.model.get('x'), this.model.get('y'), size, size);
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

        var pathParams = { stroke: '#ff0000', "stroke-width": 2 }
        this.repr.attr(_.extend({path: pathdata }, pathParams))
    }
})








