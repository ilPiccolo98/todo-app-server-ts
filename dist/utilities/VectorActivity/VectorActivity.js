"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Activity_1 = __importDefault(require("../../models/classes/Activity/Activity"));
var VectorActivity = /** @class */ (function () {
    function VectorActivity(activities) {
        var _this = this;
        if (activities === void 0) { activities = []; }
        this.activities = activities;
        this.addActivity = function (activity) {
            _this.activities.push(activity);
            return true;
        };
        this.deleteActivity = function (id) {
            console.log("delete", _this.activities);
            if (_this.doesActivityExist(id)) {
                console.log("it exists");
                var positionActivityToDelete = _this.getPositionActivity(id);
                _this.activities.splice(positionActivityToDelete, 1);
                return true;
            }
            return false;
        };
        this.updateActivity = function (activity) {
            if (_this.doesActivityExist(activity.id)) {
                var positionActivityToUpdate = _this.getPositionActivity(activity.id);
                _this.updateActivityItem(positionActivityToUpdate, activity.name, activity.description, activity.status);
                return true;
            }
            return false;
        };
        this.doesActivityExist = function (id) {
            for (var i = 0; i !== _this.activities.length; ++i) {
                console.log(_this.activities[i].Id === id);
                if (_this.activities[i].Id === id) {
                    return true;
                }
            }
            return false;
        };
        this.updateActivityItem = function (position, name, description, status) {
            _this.activities[position].Name = name;
            _this.activities[position].Description = description;
            _this.activities[position].Status = status;
        };
        this.getPositionActivity = function (id) {
            var index = 0;
            while (_this.activities[index].Id !== id &&
                index !== _this.activities.length) {
                ++index;
            }
            return index;
        };
    }
    VectorActivity.prototype.stringify = function () {
        var convertedArray = this.toPlainArrayWithPlainActivities();
        return JSON.stringify(convertedArray);
    };
    VectorActivity.prototype.size = function () {
        return this.activities.length;
    };
    VectorActivity.prototype.at = function (index) {
        return this.activities[index];
    };
    VectorActivity.prototype.toPlainArray = function () {
        return __spreadArray([], this.activities, true);
    };
    VectorActivity.prototype.toPlainArrayWithPlainActivities = function () {
        var plainArray = new Array();
        this.activities.forEach(function (activity) {
            plainArray.push(activity.toActivityPlain());
        });
        return plainArray;
    };
    VectorActivity.fromArrayPlainActivityToVectorActivity = function (activities) {
        var copyToConvert = new Array();
        activities.forEach(function (activity) {
            copyToConvert.push(Activity_1.default.fromActivityPlainToActivity(activity));
        });
        return new VectorActivity(copyToConvert);
    };
    return VectorActivity;
}());
exports.default = VectorActivity;
