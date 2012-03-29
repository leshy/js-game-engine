
function makeV(x,y) {
    return new Vector({x: x, y: y})
}


function randomNum(x) {
    return Math.round(Math.random() * x)
}

function randomV(x,y) {
    return makeV(randomNum(x),randomNum(y))
}

var Vector = Backbone.Model.extend4000({
    defaults: { name: 'vector' },

    x: function() { return this.get('x') },
    y: function() { return this.get('y') },

    isub: function(other){
        this.set({ x : this.x() - other.x(),
                   y : this.y() - other.y() })
        return this;
    },

    sub: function(other){
        return makeV( this.x() - other.x(), this.y() - other.y() );
    },

    iadd: function(other){
        this.set({ x : this.x() + other.x(),
                   y : this.y() + other.y() })
        return this;
    },

    add: function(other){
        return makeV( this.x() + other.x(), this.y() + other.y() );
    },

    imul: function(scalar){
        this.set({ x : this.x() * scalar,
                   y : this.y() * scalar })

        return this;
    },

    mul: function(scalar){
        return makeV(this.x() * scalar, this.y() * scalar)
    },

    idiv: function(scalar){
        this.set({ x : this.x() / scalar,
                   y : this.y() / scalar })
        return this;
    },

    div: function(scalar){
        return makeV(this.x() / scalar, this.y() / scalar)
    },

    normalized: function(){
        var x=this.x(), y=this.y();
        var length = Math.sqrt(x*x + y*y);
        if(length > 0){
            return makeV(x/length, y/length);
        }
        else{
            return makeV(0, 0);
        }
    },

    normalize: function(){
        var x=this.x(), y=this.y();
        var length = Math.sqrt(x*x + y*y);
        if(length > 0){
            this.set({ x : x/length,
                       y : y/length })
        }
        return this;
    },

    length: function(){
        var x = this.x(), y = this.y(); return Math.sqrt(x * x + y * y);
    },

    distance: function(other){
        var x = this.x() - other.x();
        var y = this.y() - other.y();
        return Math.sqrt(x*x + y*y);
    },

    copy: function(){
        return makeV(this.x(),this.y())
    },

    zero: function(){
        this.set({x:0,y:0})
        return this
    },

    show: function() {
        return [ this.x(), this.y() ]
    }
})

