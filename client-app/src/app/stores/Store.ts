import { createContext, useContext } from "react";
import ActivityStore from "../ActivityStore";
import CommonStore from "./CommonStore";
import UserStore from "./UserStore";

interface Store{
    activityStore:ActivityStore,
    commonStore:CommonStore;
    userStore:UserStore;
}

export const store:Store={
     activityStore:new ActivityStore(),
     commonStore:new CommonStore(),
     userStore: new UserStore()
}

export const StoreContext = createContext(store) ;

//create hook to allow component to use our store
export function useStore(){
    return useContext(StoreContext);
}