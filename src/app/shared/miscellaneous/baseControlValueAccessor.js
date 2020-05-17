"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseControlValueAccessor = /** @class */ (function () {
    function BaseControlValueAccessor() {
        this.disabled = false;
    }
    /**
    * Call when value has changed programmatically
    */
    BaseControlValueAccessor.prototype.onChange = function (newVal) { };
    BaseControlValueAccessor.prototype.onTouched = function (_) { };
    Object.defineProperty(BaseControlValueAccessor.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
            this.onChange(value);
            this.onTouched();
        },
        enumerable: true,
        configurable: true
    });
    /**
    * Model -> View changes
    */
    BaseControlValueAccessor.prototype.writeValue = function (obj) {
        this._value = obj;
    };
    BaseControlValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    BaseControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    BaseControlValueAccessor.prototype.setDisabledState = function (isDisabled) { this.disabled = isDisabled; };
    return BaseControlValueAccessor;
}());
exports.BaseControlValueAccessor = BaseControlValueAccessor;
//# sourceMappingURL=baseControlValueAccessor.js.map