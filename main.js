
function log(smthing) {
    console.log(smthing)
}



function Simulate(points) {

    gravity = new Vector({x : 0, y: -0.2, name: 'gravity'})
    
    var steps = 15;
    var delta = 1/steps;

    for(var j=0; j<steps; j++){
        for(var i=0, il=points.length; i<il; i++){
            var point = points[i];
            point.accelerate(gravity);
            point.simulate(delta);
        }
    }
}

function Simulate(delta,points,center) {
    //var steps = 15;
    //var delta = 1/steps;
    
    function geta(point1,point2) {
        if (point1 == point2) { return makeV(0,0) }
        var res = point1.sub(point2).imul((-1 / point1.distance(point2)))
        return res
    }

    _.map(points,function(point) {
        // gravity is boring
        //var a = point.sub(center).imul(-1 / Math.pow( point.distance(center), 2 ) * 40.0)

        var a = point.sub(center).imul((-1 / point.distance(center)) ) 

        /*
        var a = makeV(0,0)
        _.map(points,function(point2) {
            a.iadd(geta(point,point2))
        })
        */
        
        point.acceleration(a)


        point.simulate(delta)
    })   
}

function start() {
    log('start')
    var paper = Raphael("canvas", 600, 600)
    paper.clear();
    window.paper = paper

    function getpoint(v) {
        var x = new Thing({x : v.x(), y: v.y(), size: 5 })
        var xv = new ThingView({model:x,paper:paper})
  //      var vv = new VectView({model: x.velocity(), paper: paper })
  //      var av = new VectView({model: x.acceleration(), paper: paper, color: 'green' })
        return x
    }

    var points = []
    
    _.times(25, function() {
            points.push(getpoint(randomV(600,600)))
    })

    console.log(points)

    var m = new Thing({x: 10, y:10, size:5})
    var mv = new ThingView({model:m,paper:paper})
    canvas.addEventListener('mousemove', function(evt){
        m.set({ x: evt.layerX - 10, y: evt.layerY - 10 })
    }, false);
    
    window.go = function() { Simulate(0.1,points,m) }
}


$(document).ready(start)
