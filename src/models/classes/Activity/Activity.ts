import IClonable from "../../interfaces/iClonable";

export type ActivityPlain = {
  id: number;
  name: string;
  description: string;
  status: boolean;
};

class Activity implements IClonable<Activity> {
  public constructor(
    private id: number,
    private name: string,
    private description: string,
    private status: boolean
  ) {}

  public get Id() {
    return this.id;
  }

  public get Name() {
    return this.name;
  }

  public set Name(name: string) {
    this.name = name;
  }

  public get Description() {
    return this.description;
  }

  public set Description(description: string) {
    this.description = description;
  }

  public get Status() {
    return this.status;
  }

  public set Status(status: boolean) {
    this.status = status;
  }

  public clone(): Activity {
    const copy = new Activity(
      this.id,
      this.name,
      this.description,
      this.status
    );
    return copy;
  }

  public toActivityPlain(): ActivityPlain {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      status: this.status,
    };
  }

  public static fromActivityPlainToActivity(activity: ActivityPlain): Activity {
    const convertedActivity = new Activity(
      activity.id,
      activity.name,
      activity.description,
      activity.status
    );
    return convertedActivity;
  }
}

export default Activity;
