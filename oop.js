/* 
	Copyright Jonathan Wagner (jonathan@52stairs.com)
	This is the primary OOP class that Scribble Maps uses. It is designed primarily to reduce code duplication with primary traits of inheritance and polymorphism.
	This OOP class works with all settings of Google Closure.
	MIT License
*/


var wrapFunc = function (self, key, method) {
        var wrapper = function() {
            if (self.Extends && self.Extends.prototype[key]) {
                    this.parent = wrapFunc(self.Extends, key, self.Extends.prototype[key]);
            }

            return method.apply(this, arguments);
        }

        return wrapper;
};

var classList = [];
var registerClass = function (instance, description) {
    classList.push({
        instance: instance,
        description: description
    });
}

var findClassDescription = function (e) {
    for (var i = 0; i < classList.length; i++) {
        if (classList[i].instance == e) {
            return classList[i];
        }
    }

    return null;
}

var Class = function(c) {
        var $class = c;
        var $extends = c.Extends;
        var superList = [];

        var cls = function () {
            if (this.initialize) {
                this.initialize.apply(this, arguments);
            }

            var sl = this;
            for (var i = 0; i < superList.length; i++) {
                sl.Super = new superList[i](this);
                sl = sl.Super;
            }
 
            this.$extends = $extends;
            this.instanceOf = function (type) {
                var e = this;
                if (e instanceof type) {
                    return true;
                }

                e = e.$extends;

                while (e) {
                    if (e == type) {
                        return true;
                    }
                    
                    e = findClassDescription(e);
                    if (e) e = e.description.Extends;
                }
                

                return false;
            }
        };

        if ($extends) {
            for (var se in $extends.prototype) {
                cls.prototype[se] = wrapFunc(c, se, $extends.prototype[se]);
            }
        }

        for (var s in c) {
            if (c[s] != c.Extends) {
                cls.prototype[s] = wrapFunc(c, s, c[s]);
            }
        }


        registerClass(cls, c);
        return cls;
};


