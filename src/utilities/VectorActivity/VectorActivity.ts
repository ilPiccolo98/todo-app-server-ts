import Activity, {
  ActivityPlain,
} from "../../models/classes/Activity/Activity";

class VectorActivity {
  public constructor(private activities: Array<Activity> = []) {}

  public stringify(): string {
    const convertedArray: ActivityPlain[] =
      this.toPlainArrayWithPlainActivities();
    return JSON.stringify(convertedArray);
  }

  public size(): number {
    return this.activities.length;
  }

  public at(index: number): Activity {
    return this.activities[index];
  }

  public toPlainArray(): Array<Activity> {
    return [...this.activities];
  }

  public toPlainArrayWithPlainActivities(): Array<ActivityPlain> {
    const plainArray = new Array<ActivityPlain>();
    this.activities.forEach((activity: Activity) => {
      plainArray.push(activity.toActivityPlain());
    });
    return plainArray;
  }

  public static fromArrayPlainActivityToVectorActivity(
    activities: Array<ActivityPlain>
  ): VectorActivity {
    const copyToConvert = new Array<Activity>();
    activities.forEach((activity: ActivityPlain) => {
      copyToConvert.push(Activity.fromActivityPlainToActivity(activity));
    });
    return new VectorActivity(copyToConvert);
  }

  public addActivity = (activity: Activity): boolean => {
    this.activities.push(activity);
    return true;
  };

  public deleteActivity = (id: number): boolean => {
    console.log("delete", this.activities);
    if (this.doesActivityExist(id)) {
      console.log("it exists");
      const positionActivityToDelete: number = this.getPositionActivity(id);
      this.activities.splice(positionActivityToDelete, 1);
      return true;
    }
    return false;
  };

  public updateActivity = (activity: ActivityPlain): boolean => {
    if (this.doesActivityExist(activity.id)) {
      const positionActivityToUpdate: number = this.getPositionActivity(
        activity.id
      );
      this.updateActivityItem(
        positionActivityToUpdate,
        activity.name,
        activity.description,
        activity.status
      );
      return true;
    }
    return false;
  };

  private doesActivityExist = (id: number): boolean => {
    for (let i: number = 0; i !== this.activities.length; ++i) {
      console.log(this.activities[i].Id === id);
      if (this.activities[i].Id === id) {
        return true;
      }
    }
    return false;
  };

  private updateActivityItem = (
    position: number,
    name: string,
    description: string,
    status: boolean
  ): void => {
    this.activities[position].Name = name;
    this.activities[position].Description = description;
    this.activities[position].Status = status;
  };

  private getPositionActivity = (id: number): number => {
    let index: number = 0;
    while (
      this.activities[index].Id !== id &&
      index !== this.activities.length
    ) {
      ++index;
    }
    return index;
  };
}

export default VectorActivity;
