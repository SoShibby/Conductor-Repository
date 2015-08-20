DataTypeUtil = (function() {
    function isString(value) {
        return typeof value === "string";
    }

    function isBoolean(value) {
        return typeof value === "boolean";
    }

    function isInt(value) {
        return Number(value) === value && value % 1 === 0
    }

    function isDouble(value) {
        return value === Number(value) && value % 1 !== 0;
    }

    function isFloat(value) {
        return value === Number(value) && value % 1 !== 0;
    }

    function isArray(value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    }

    function isObject(value) {
        return Object.prototype.toString.call(value) === '[object Object]';
    }

    return {
        isString: isString,
        isBoolean: isBoolean,
        isInt: isInt,
        isDouble: isDouble,
        isFloat: isFloat,
        isArray: isArray,
        isObject: isObject
    }
}());