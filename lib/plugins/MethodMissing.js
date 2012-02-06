var define = require("../define").define, base = require("../base");

/**
 * @class This plugin exposes two instance properties:
 * <ul>
 *     <li><b>getMissingProperty</b> method called when a property is being retrieved and is not found on the current instance</li>
 *     <li><b>setMissingProperty</b> method called when a property is being set and the property is not found on the current instance</li>
 * </ul>
 *
 * @example
 *
 * var MyClass = comb.define(comb.plugins.MethodMissing, {
 *     instance : {
 *
 *         constructor : function(){
 *              this._attributes = {};
 *         },
 *
 *         getMissingProperty : function(name){
 *             return this._attributes[name];
 *         },
 *
 *         setMissingProperty : function(name, value){
 *             return this._attributes[name] = value;
 *         }
 *     }
 * });
 *
 * @name MethodMissing
 * @memberOf comb.plugins
 */
var undef;
define(null, {

    instance:{
        /**@lends comb.plugins.MethodMissing*/
        /**
         * Method called to retrieve a property that is not found on the current instance of the object
         * @param {String} name the name of the property to retrieve.
         */
        getMissingProperty:function (name) {
            //return defaults
            return this[name];
        },

        /**
         * Method called to set a property that is not found on the current instance of the object
         * @param {String} name the name of the property to set.
         * @param value the value to set the property to.
         */
        setMissingProperty:function (name, value) {
            //return defaults
            return this[name] = value;
        }
    },

    static:{
        init:function () {
            this._super(arguments);
            var Orig = this;
            var ret = function () {
                try {
                    var ret = new Orig();
                } catch (ignore) {
                }

                Orig.apply(ret, arguments);
                var prox = base.handlerProxy(ret, {
                    get:function (receiver, name) {
                        return ret[name] || ret.getMissingProperty.apply(ret, [name]);
                    },
                    set:function (receiver, name, val) {
                        return ret[name] || ret.setMissingProperty.apply(ret, [name, val]);
                    }
                }, Orig);
                return prox;
            }
            ret.__proto__ = this;
            ret.prototype = Orig.prototype;
            return ret;
        }
    }

}).as(module);
