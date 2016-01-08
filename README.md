# LightSpeed
A collection of JS utilities I use regularily. Many of these scripts are purpose built to satisfy certain objectives such as working with google closure or size/simplicity.

## OOP.js
This script was designed specifically to support polymorphism, inheritance, and work with all settings of Google Closure. Unlike other JS OOP
frameworks/scripts, this class was not designed to support all features generally associated with OOP such as private variables, though private variables
could be achived by making a derivative object that references the functions of the initial class. Keep in mind that this script is not namespaced and
that you should add your own namespacing to prevent any potential conflict.

#### Usage
```javascript
var MyClass = new Class({
  initialize: function(var1) {
    this.var1 = var1;
  },
  myFunction = function() {
    return this.var1 + 1;
  }
});

var MyExtendedClass = new Class({
  Extends: MyClass,
  initialize: function(var1) {
    this.parent(var1);
  },
  myFunction: function() {
    return this.parent() + 1;
  }
});

var myClass = new MyClass(1);
console.log(myClass.myFunction()); // 2;

var myExtendedClass = new MyExtendedClass(1);
console.log(myExtendedClass.myFunction()); //3;
```

Fiddle: https://jsfiddle.net/50p1baeg/
