"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateActivity = exports.deleteActivity = exports.addActivity = exports.retrieve = void 0;
var activities_1 = __importDefault(require("../services/activities"));
var Activity_1 = __importDefault(require("../models/classes/Activity/Activity"));
var activitiesService = new activities_1.default(__dirname + "/files/activities.txt");
var retrieve = function (req, res) {
    var activities = activitiesService.getActivities();
    res.send({ activities: activities });
};
exports.retrieve = retrieve;
var addActivity = function (req, res, next) {
    var body = req.body;
    var newActivity = new Activity_1.default(body.name, body.description, body.status);
    activitiesService.addActivity(newActivity);
    activitiesService.saveActivitiesAsync(function (err) {
        if (err) {
            res.send({ isItAdded: false });
        }
        else {
            res.send({ isItAdded: true });
        }
    });
};
exports.addActivity = addActivity;
var deleteActivity = function (req, res) {
    activitiesService.deleteActivity(req.params.id);
    activitiesService.saveActivitiesAsync(function (err) {
        if (err) {
            res.send({ isItAdded: false });
        }
        else {
            res.send({ isItAdded: true });
        }
    });
};
exports.deleteActivity = deleteActivity;
var updateActivity = function (req, res) {
    var body = req.body;
    activitiesService.updateActivity(body.activity);
    activitiesService.saveActivitiesAsync(function (err) {
        if (err) {
            res.send({ isItAdded: false });
        }
        else {
            res.send({ isItAdded: true });
        }
    });
};
exports.updateActivity = updateActivity;
