import { RequestHandler } from "express";
import ActivitiesService from "../services/activities";
import Activity, { ActivityPlain } from "../models/classes/Activity/Activity";

type AddActivityBody = {
  name: string;
  description: string;
  status: boolean;
};

type DeleteActivityParams = {
  id: number;
};

type UpdateActivityBody = {
  activity: ActivityPlain;
};

const activitiesService = new ActivitiesService(
  `${__dirname}/files/activities.txt`
);

export const retrieve: RequestHandler = (req, res) => {
  const activities: ActivityPlain[] = activitiesService.getActivities();
  res.send({ activities });
};

export const addActivity: RequestHandler = (req, res, next) => {
  const body: AddActivityBody = req.body as AddActivityBody;
  const newActivity = new Activity(body.name, body.description, body.status);
  activitiesService.addActivity(newActivity);
  activitiesService.saveActivitiesAsync((err) => {
    if (err) {
      res.send({ isItAdded: false });
    } else {
      res.send({ isItAdded: true });
    }
  });
};

export const deleteActivity: RequestHandler<DeleteActivityParams> = (
  req,
  res
) => {
  activitiesService.deleteActivity(req.params.id);
  activitiesService.saveActivitiesAsync((err) => {
    if (err) {
      res.send({ isItAdded: false });
    } else {
      res.send({ isItAdded: true });
    }
  });
};

export const updateActivity: RequestHandler = (req, res) => {
  const body: UpdateActivityBody = req.body as UpdateActivityBody;
  activitiesService.updateActivity(body.activity);
  activitiesService.saveActivitiesAsync((err) => {
    if (err) {
      res.send({ isItAdded: false });
    } else {
      res.send({ isItAdded: true });
    }
  });
};
