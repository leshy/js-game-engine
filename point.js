
function vectorize(object,atrname,defaults) {
    setdict = {}
    var attribute = object.get(atrname)
    
    if (!attribute) { 
        setdict[atrname] = makeV.apply(this,defaults).set({host: object})
        return setdict
    }

    if (attribute.constructor == Array) {
        setdict[atrname] = makeV.apply(this,attribute).set({host: object})
        return setdict
    }

    if (attribute.constructor === Vector) {
        attribute.set({host: object})
        return {}
    }
    
    setdict[atrname] = makeV.apply(this,defaults).set({host: object})
    
    return setdict
}


var Point = Vector.extend4000({
    defaults: { name: 'point' },
    initialize: function() {
        var setdict = {}
        _.extend(setdict, vectorize(this,'velocity',[0,0]))
        _.extend(setdict, vectorize(this,'acceleration',[0,0]))

        this.set(setdict)
    },

    acceleration: function() {
        return this.get('acceleration')
    },

    velocity: function() {
        return this.get('velocity')
    },

    accelerate: function(vector) {
        this.acceleration().iadd(vector);
    },

    simulate: function(delta) {
        this.velocity().iadd(this.acceleration().mul(delta));
        //this.acceleration().zero();
        this.iadd(this.velocity().mul(delta));
    }
})



var Constraint = Backbone.Model.extend4000({
    initialize: function() {
        
        this.target = point1().distance(point2().position);
    },
    
    point1: function() {
        return this.get(point1)
    },

    point2: function() {
        return this.get(point2)
    }

})