import VectorActivity from "../utilities/VectorActivity/VectorActivity";
import Activity, { ActivityPlain } from "../models/classes/Activity/Activity";
import fs, { NoParamCallback } from "fs";

class ActivitiesService {
  public constructor(private path: string) {
    this.activities = new VectorActivity();
    this.readActivitiesFile();
  }

  public generateId(): number {
    return this.activities.generateId();
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
    if (fs.existsSync(this.path)) {
      const fileContent: string = fs.readFileSync(this.path, "utf-8");
      this.initActivities(fileContent);
    } else {
      fs.writeFile(this.path, "", (error) => {
        if (error) {
          console.log(error);
        }
      });
    }
  }

  private initActivities(activities: string): void {
    if (activities.length) {
      this.activities = VectorActivity.fromArrayPlainActivityToVectorActivity(
        JSON.parse(activities)
      );
    } else {
      this.activities = new VectorActivity();
    }
  }

  private activities: VectorActivity;
}

export default ActivitiesService;
