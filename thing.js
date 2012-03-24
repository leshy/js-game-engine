

var indexToV = function(i) {
    if (i == 0) { return makeV(-1, 1) }
    if (i == 1) { return makeV( 1, 1) }
    if (i == 2) { return makeV( 1,-1) }
    if (i == 3) { return makeV(-1,-1) }
}



var Thing = Backbone.Model.extend4000(
    Point,
    GraphNode,
    {

        defaults: { size: 1 },
        initialize: function() {
        },
        
        // calculate weight
        weight: function() {
            return this.children.reduce(function(memo,child) { 
                if (!child) { return memo }
                return memo + child.weight() 
            }, 0)
        },

        // calculate center of gravity
        center: function() {
            return this.children.reduce(function(center,child,index) { 
                if (!child) { return center }
                console.log(indexToV(index).show())
                console.log('center',center.show())
                return center.iadd( indexToV(index) )
            }, makeV(0,0)).normalize()
        }
    })

var AtomicThing = Thing.extend4000({
    defaults: { name: 'defaultmaterial', size : 1, density: 1 },    
    weight: function() { return this.get('density') * this.get('size') }
})


