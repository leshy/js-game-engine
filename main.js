
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

function start() {
    log('start')
    var paper = Raphael("canvas", 600, 600)
    paper.clear();
    window.paper = paper
    var x = new Obj({x : 10, y: 10, acceleration: [1,1] })
    var xv = new ObjView({model:x,paper:paper})
    var vv = new VectViewArrow({model: x.velocity(), paper: paper })

    window.x = x
    window.vv = vv
    x.simulate(15)
}



$(document).ready(start)
