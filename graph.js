
// a node that connects to other nodes via 'plugs'
// plug is just a name of collection that contains other nodes
// GraphNode specializes GenericGraphNode by adding 'children' and 'parents' plugs
var GenericGraphNode = Backbone.Model.extend({ 
    defaults: { name: 'node' },

    initialize: function() {
        var self = this

        // simple decorator to check if plug exists for plug accepting functions
        var plugfundecorator = function() {
            var args = toArray(arguments); var f = args.shift(); var plugname = _.first(args);
            if (!self.plugs[plugname]) { throw "graph node can't find plug named '" + plugname + "'"; return; }
            return f(args)
        }
        
        _.map(['get', 'add', 'remove', 'has'], function(fname) {
            self.fname = decorate(plugfundecorator,self.fname)
        })

        this.plugs = {}
    },

    name: function() {
        return this.get('name')
    },

    addplug: function(plugplural, plugsingular, nomodels) {
        var self = this;
        if (!plugsingular) { plugsingular = plugplural }
        this.plugs[plugplural] = true
        this[ plugplural ] = new Backbone.Collection()
        
        this[ 'add' + plugsingular ] = decorate(multiArg,function(obj) { return self.plugadd.call(self,plugplural,obj) })
        this[ 'del' + plugsingular ] = decorate(multiArg,function(obj) { return self.plugremove.call(self,plugplural,obj) })
        this[ 'del' + plugplural ] = function() { return self.plugremoveall.call(self,plugplural) }
        this[ 'has' + plugsingular ] = function(obj) { return self.plughas.call(self,plugplural,obj) }
        this[ 'get' + plugsingular ] = function() { return _.first(self.plugget.call(self,plugplural)) }
        this[ 'get' + plugplural ] = function() { return self.plugget.call(self,plugplural) }

    },

    plugget: function(plug) {
        return this[plug].models
    },

    plugadd: function(plug,obj) {
        //console.log(this.get('name'), 'add', plug,obj.get('name'))
        if (!this.plughas(plug,obj)) { this[plug].add(obj) }
    },

    plugremove: function(plug,obj) {
        this[plug].remove(obj)
    },

    plugremoveall: function(plug,obj) {
        var plug = this[plug]
        plug.map(function(obj) { plug.remove(obj) })
    },

    plughas: function(plug, obj) {
        return (this[plug].indexOf(obj) != -1)
    }
})


// GraphNode specializes GenericGraphNode by adding 'children' and 'parents' plugs
var GraphNode = GenericGraphNode.extend4000({
    initialize: function() {
        var self = this;
        
        this.addplug('parents','parent')
        this.addplug('children','child')
        
        this.parents.bind('add',function(obj) {
            obj.addchild(self)
        })
        
        this.children.bind('add',function(obj) {
            obj.addparent(self)
        })        
    }
})


