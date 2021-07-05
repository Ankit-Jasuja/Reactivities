import { makeAutoObservable, runInAction } from "mobx"
import agent from "./api/agent";
import { Activity } from "./models/activity"
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadActivities = async () => {
        this.setLoadingInital(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activities.push(activity);//we do not do it redux but mobx creates allow us to mutate the state
            })
            this.setLoadingInital(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInital(false);;
        }
    }

    setLoadingInital = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(z => z.id === id);
        this.editMode = false;
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activities.push(activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    //editMode true,activity form will show up

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activities = [...this.activities.filter(z => z.id !== activity.id), activity]
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}
