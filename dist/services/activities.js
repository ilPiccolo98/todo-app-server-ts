"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var VectorActivity_1 = __importDefault(require("../utilities/VectorActivity/VectorActivity"));
var fs_1 = __importDefault(require("fs"));
var ActivitiesService = /** @class */ (function () {
    function ActivitiesService(path) {
        this.path = path;
        this.activities = new VectorActivity_1.default();
        this.readActivitiesFile();
    }
    ActivitiesService.prototype.generateId = function () {
        return this.activities.generateId();
    };
    ActivitiesService.prototype.getActivities = function () {
        return this.activities.toPlainArrayWithPlainActivities();
    };
    ActivitiesService.prototype.addActivity = function (activity) {
        return this.activities.addActivity(activity);
    };
    ActivitiesService.prototype.updateActivity = function (activity) {
        return this.activities.updateActivity(activity);
    };
    ActivitiesService.prototype.deleteActivity = function (id) {
        return this.activities.deleteActivity(id);
    };
    ActivitiesService.prototype.saveActivitiesAsync = function (callback) {
        fs_1.default.writeFile(this.path, this.getStringyfiedActivities(), callback);
    };
    ActivitiesService.prototype.getStringyfiedActivities = function () {
        return JSON.stringify(this.activities.toPlainArrayWithPlainActivities());
    };
    ActivitiesService.prototype.readActivitiesFile = function () {
        if (fs_1.default.existsSync(this.path)) {
            var fileContent = fs_1.default.readFileSync(this.path, "utf-8");
            this.initActivities(fileContent);
        }
        else {
            fs_1.default.writeFile(this.path, "", function (error) {
                if (error) {
                    console.log(error);
                }
            });
        }
    };
    ActivitiesService.prototype.initActivities = function (activities) {
        if (activities.length) {
            this.activities = VectorActivity_1.default.fromArrayPlainActivityToVectorActivity(JSON.parse(activities));
        }
        else {
            this.activities = new VectorActivity_1.default();
        }
    };
    return ActivitiesService;
}());
exports.default = ActivitiesService;
