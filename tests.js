var fs = require('fs');
var _ = require('underscore')
var Backbone = require('backbone')

var expression = fs.readFileSync('./lib/backbone_extensions.js','utf8');
eval(expression)

var expression = fs.readFileSync('./vector.js','utf8');
eval(expression)

var expression = fs.readFileSync('./graph.js','utf8');
eval(expression)

var expression = fs.readFileSync('./quad.js','utf8');
eval(expression)

var expression = fs.readFileSync('./classicalmechanics.js','utf8');
eval(expression)

var expression = fs.readFileSync('./lib/decorators.js','utf8');
eval(expression)

var expression = fs.readFileSync('./thing.js','utf8');
eval(expression)


// converts retarded magical arguments object to an Array object
function toArray(arg) { return Array.prototype.slice.call(arg) }



exports.Vector_Arithmetics = function(test) {
    test.equal(makeV(1,1).isub(makeV(2,-3)).show().join(),'-1,4')
    test.done()
};


exports.Vector_Constructor = function(test) {
    var x = new Thing()

    x.set({test0: makeV(1,2)})
    x.set({test1: [3,4]})
    
    x.set(_.extend({},
             vectorize(x,'test0',[5,6]),
             vectorize(x,'test1',[7,8]),
             vectorize(x,'test2',[9,10])
                  ))

    test.equal(JSON.stringify([x.get('test0').show(), x.get('test1').show(),x.get('test2').show()]),"[[1,2],[3,4],[9,10]]")    
    test.done()    
}

exports.ClassicalMechanics_Simulation = function(test) {
    var p = new ClassicalMechanics({ velocity: [0,0], acceleration: makeV(1,2)})
    test.equal(p.velocity().show().join() + p.acceleration().show().join(), '0,01,2')
    p.simulate(0.1)
    test.equal(p.velocity().show().join() + p.acceleration().show().join(), '0.1,0.21,2')
    test.done()
}


exports.Body_CenterOfWeight = function(test) {
    var o = new Thing()
    var a1 = new Thing()
    var a2 = new Thing()
    var a3 = new Thing()
    a3.set({density: 0})
    o.addchild(a1)
    o.addchild(a2)
    test.done()
}

