import VectorActivity from "../utilities/VectorActivity/VectorActivity";
import Activity, { ActivityPlain } from "../models/classes/Activity/Activity";
import fs, { NoParamCallback } from "fs";

class ActivitiesService {
  public constructor(private path: string) {
    this.activities = new VectorActivity();
    this.readActivitiesFile();
  }

  public getActivities(): ActivityPlain[] {
    return this.activities.toPlainArrayWithPlainActivities();
  }

  public addActivity(activity: Activity): boolean {
    return this.activities.addActivity(activity);
  }

  public updateActivity(activity: ActivityPlain): boolean {
    return this.activities.updateActivity(activity);
  }

  public deleteActivity(id: number): boolean {
    return this.activities.deleteActivity(id);
  }

  public saveActivitiesAsync(callback: NoParamCallback) {
    fs.writeFile(this.path, this.getStringyfiedActivities(), callback);
  }

  private getStringyfiedActivities(): string {
    return JSON.stringify(this.activities.toPlainArrayWithPlainActivities());
  }

  private readActivitiesFile(): void {
    const fileContent: string = fs.readFileSync(this.path, "utf-8");
    this.activities = VectorActivity.fromArrayPlainActivityToVectorActivity(
      JSON.parse(fileContent)
    );
  }

  private activities: VectorActivity;
}

export default ActivitiesService;
