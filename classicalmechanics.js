
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


var ClassicalMechanics = Vector.extend4000({
    defaults: { name: 'PhysicalObject' },
    initialize: function() {
        var setdict = {}
        _.extend(setdict, vectorize(this,'velocity',[0,0]))
        _.extend(setdict, vectorize(this,'acceleration',[0,0]))

        this.set(setdict)
    },

    acceleration: function(set) {
        if (!set) { return this.get('acceleration') }
        var a = this.get('acceleration')
        a.set({x: set.x(),y:set.y()})
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
