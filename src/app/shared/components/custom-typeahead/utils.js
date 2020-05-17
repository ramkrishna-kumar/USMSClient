"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var TypeaheadItem = /** @class */ (function () {
    function TypeaheadItem(id, displayName, imageUrl, itemType) {
        this.id = id;
        this.displayName = displayName;
        this.itemType = itemType;
        this.imageUrl = imageUrl;
    }
    return TypeaheadItem;
}());
exports.TypeaheadItem = TypeaheadItem;
var TypeaheadImage = /** @class */ (function () {
    function TypeaheadImage(imageUrl, objectUrl) {
        this.objectUrl = objectUrl;
        this.imageUrl = imageUrl;
    }
    return TypeaheadImage;
}());
exports.TypeaheadImage = TypeaheadImage;
var http = new http_1.HttpClient(new http_1.HttpXhrBackend({ build: function () { return new XMLHttpRequest(); } }));
var TypeaheadCollection = /** @class */ (function () {
    function TypeaheadCollection(array, idFieldName, displayNameFieldName, imageUrl, itemType) {
        this.items = {};
        this.images = {};
        this.count = 0;
        this.SortedValues = [];
        this.AddArray(array, idFieldName, displayNameFieldName, imageUrl, itemType);
    }
    TypeaheadCollection.prototype.GetImageUrl = function (imageUrl) {
        if (this.images.hasOwnProperty(imageUrl)) {
            return this.images[imageUrl];
        }
        else {
            return imageUrl;
        }
    };
    TypeaheadCollection.prototype.ContainsKey = function (key) {
        return this.items.hasOwnProperty(key);
    };
    TypeaheadCollection.prototype.Count = function () {
        return this.count;
    };
    TypeaheadCollection.prototype.Add = function (key, value) {
        if (!this.items.hasOwnProperty(key))
            this.count++;
        this.items[key] = value;
    };
    TypeaheadCollection.prototype.AddArray = function (array, id, displayName, imageUrl, itemType) {
        var _this = this;
        array.forEach(function (item) {
            if (displayName && id) {
                _this.Add(item[id], new TypeaheadItem(item[id], item[displayName], imageUrl, itemType));
            }
            else {
                _this.Add(item, new TypeaheadItem(item, item, imageUrl, itemType));
            }
        });
        if (imageUrl && !this.images.hasOwnProperty(imageUrl)) {
            http.get(this.absolutePath(imageUrl), { responseType: "blob" })
                .subscribe(function (response) {
                var urlCreator = window.URL;
                var theUrl = urlCreator.createObjectURL(response);
                _this.images[imageUrl] = theUrl;
            });
        }
        this.SortedValues = this.getSortedValues();
    };
    TypeaheadCollection.prototype.absolutePath = function (href) {
        var link = document.createElement("a");
        link.href = href;
        return link.href;
    };
    TypeaheadCollection.prototype.Remove = function (key) {
        var val = this.items[key];
        delete this.items[key];
        this.count--;
        return val;
    };
    TypeaheadCollection.prototype.Item = function (key) {
        return this.items[key];
    };
    TypeaheadCollection.prototype.Keys = function () {
        var keySet = [];
        for (var prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                keySet.push(prop);
            }
        }
        return keySet;
    };
    TypeaheadCollection.prototype.Values = function () {
        var values = [];
        for (var prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                values.push(this.items[prop]);
            }
        }
        return values;
    };
    TypeaheadCollection.prototype.getSortedValues = function () {
        var values = [];
        for (var prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                values.push(this.items[prop]);
            }
        }
        return values.sort(function (n1, n2) {
            if (n1.displayName > n2.displayName) {
                return 1;
            }
            if (n1.displayName < n2.displayName) {
                return -1;
            }
            return 0;
        });
    };
    return TypeaheadCollection;
}());
exports.TypeaheadCollection = TypeaheadCollection;
//# sourceMappingURL=utils.js.map