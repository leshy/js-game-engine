

// quad is assembled from other quads unless it is an atomicquad

var Quad = Backbone.Model.extend4000( GraphNode, Vector,
    {
        defaults: { size: 1 },
        
        indexToPos: function(i) {
            if (i == 0) { return makeV(-1, 1) }
            if (i == 1) { return makeV( 1, 1) }
            if (i == 2) { return makeV( 1,-1) }
            if (i == 3) { return makeV(-1,-1) }
        },

    })


var NothingQuad = Quad.extend4000({
    explode: function() {
        if (!this.children.length) {
            var size = this.get('size') / 2
            var self = this;
            _.times(4, function () { self.addchild(new Quad({size: size})) } )
            this.trigger('explode')
        }
        return this.children
    }    
})