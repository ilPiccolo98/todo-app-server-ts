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
  id: number;
  name: string;
  description: string;
  status: boolean;
};

const activitiesService = new ActivitiesService(
  `${__dirname}\\..\\files\\activities.txt`
);

export const retrieve: RequestHandler = (req, res) => {
  const activities: ActivityPlain[] = activitiesService.getActivities();
  res.send({ activities });
};

export const addActivity: RequestHandler = (req, res) => {
  const body: AddActivityBody = req.body as AddActivityBody;
  const newActivity = new Activity(
    activitiesService.generateId(),
    body.name,
    body.description,
    body.status
  );
  if (activitiesService.addActivity(newActivity)) {
    activitiesService.saveActivitiesAsync((err) => {
      if (err) {
        res.send({ isItAdded: false });
      } else {
        res.send({ isItAdded: true });
      }
    });
  } else {
    res.send({ isItAdded: true });
  }
};

export const deleteActivity: RequestHandler<DeleteActivityParams> = (
  req,
  res
) => {
  if (activitiesService.deleteActivity(+req.params.id)) {
    activitiesService.saveActivitiesAsync((err) => {
      if (err) {
        res.send({ isItDeleted: false });
      } else {
        res.send({ isItDeleted: true });
      }
    });
  } else {
    res.send({ isItDeleted: false });
  }
};

export const updateActivity: RequestHandler = (req, res) => {
  const body: UpdateActivityBody = req.body as UpdateActivityBody;
  if (activitiesService.updateActivity({ ...req.body })) {
    activitiesService.saveActivitiesAsync((err) => {
      if (err) {
        res.send({ isItUpdated: false });
      } else {
        res.send({ isItUpdated: true });
      }
    });
  } else {
    res.send({ isItUpdate: false });
  }
};
