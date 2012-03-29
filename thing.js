//
// a thing can be assembled from other things
// thing has a center of mass, velocity, acceleration and things like that.
//
// thing that is not assembled from other things is called AtomicThing
//
// AtomicThing is subclassed by a Material. Material reacts to other Materials
// is destructible, has mass, friction, and some other stuff I'm sure
//

var Thing = Backbone.Model.extend4000(
    Quad,
    ClassicalMechanics,
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
            var self = this;
            return this.children.reduce(function(center,child,index) { 
                if (!child) { return center }
                console.log(self.indexToPos(index).show())
                console.log('center',center.show())
                return center.iadd( self.indexToPos(index) )
            }, makeV(0,0)).normalize()
        }
    })

var AtomicThing = Thing.extend4000({
    defaults: { name: 'defaultmaterial', size : 1, density: 1 },    
    weight: function() { return this.get('density') * this.get('size') }
})

