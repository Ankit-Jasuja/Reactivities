import { createContext, useContext } from "react";
import ActivityStore from "../ActivityStore";
import CommonStore from "./CommonStore";

interface Store{
    activityStore:ActivityStore,
    commonStore:CommonStore;
}

export const store:Store={
     activityStore:new ActivityStore(),
     commonStore:new CommonStore()
}

export const StoreContext = createContext(store) ;

//create hook to allow component to use our store
export function useStore(){
    return useContext(StoreContext);
}