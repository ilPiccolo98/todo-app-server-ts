"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateActivity = exports.deleteActivity = exports.addActivity = exports.retrieve = void 0;
var activities_1 = __importDefault(require("../services/activities"));
var Activity_1 = __importDefault(require("../models/classes/Activity/Activity"));
var activitiesService = new activities_1.default(__dirname + "\\..\\files\\activities.txt");
var retrieve = function (req, res) {
    var activities = activitiesService.getActivities();
    res.send({ activities: activities });
};
exports.retrieve = retrieve;
var addActivity = function (req, res) {
    var body = req.body;
    var newActivity = new Activity_1.default(activitiesService.generateId(), body.name, body.description, body.status);
    if (activitiesService.addActivity(newActivity)) {
        activitiesService.saveActivitiesAsync(function (err) {
            if (err) {
                res.send({ isItAdded: false });
            }
            else {
                res.send({ isItAdded: true });
            }
        });
    }
    else {
        res.send({ isItAdded: true });
    }
};
exports.addActivity = addActivity;
var deleteActivity = function (req, res) {
    if (activitiesService.deleteActivity(+req.params.id)) {
        activitiesService.saveActivitiesAsync(function (err) {
            if (err) {
                res.send({ isItDeleted: false });
            }
            else {
                res.send({ isItDeleted: true });
            }
        });
    }
    else {
        res.send({ isItDeleted: false });
    }
};
exports.deleteActivity = deleteActivity;
var updateActivity = function (req, res) {
    var body = req.body;
    if (activitiesService.updateActivity(__assign({}, req.body))) {
        activitiesService.saveActivitiesAsync(function (err) {
            if (err) {
                res.send({ isItUpdated: false });
            }
            else {
                res.send({ isItUpdated: true });
            }
        });
    }
    else {
        res.send({ isItUpdate: false });
    }
};
exports.updateActivity = updateActivity;
