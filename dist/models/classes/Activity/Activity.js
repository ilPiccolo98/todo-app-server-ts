"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Activity = /** @class */ (function () {
    function Activity(name, description, status) {
        this.name = name;
        this.description = description;
        this.status = status;
        this.id = Activity.counterId;
        ++Activity.counterId;
    }
    Activity.resetIdGenerator = function () {
        Activity.counterId = 1;
    };
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
        var copy = new Activity(this.name, this.description, this.status);
        copy.id = this.id;
        --Activity.counterId;
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
        var convertedActivity = new Activity(activity.name, activity.description, activity.status);
        convertedActivity.id = activity.id;
        --Activity.counterId;
        return convertedActivity;
    };
    Activity.counterId = 1;
    return Activity;
}());
exports.default = Activity;
