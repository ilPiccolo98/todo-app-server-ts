"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Activity = /** @class */ (function () {
    function Activity(id, name, description, status) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
    }
    Object.defineProperty(Activity.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "Name", {
        get: function () {
            return this.name;
        },
        set: function (name) {
            this.name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "Description", {
        get: function () {
            return this.description;
        },
        set: function (description) {
            this.description = description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "Status", {
        get: function () {
            return this.status;
        },
        set: function (status) {
            this.status = status;
        },
        enumerable: false,
        configurable: true
    });
    Activity.prototype.clone = function () {
        var copy = new Activity(this.id, this.name, this.description, this.status);
        return copy;
    };
    Activity.prototype.toActivityPlain = function () {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            status: this.status,
        };
    };
    Activity.fromActivityPlainToActivity = function (activity) {
        var convertedActivity = new Activity(activity.id, activity.name, activity.description, activity.status);
        return convertedActivity;
    };
    return Activity;
}());
exports.default = Activity;
