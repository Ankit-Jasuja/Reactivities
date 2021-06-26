import { createContext, useContext } from "react";
import ActivityStore from "../ActivityStore";

interface Store{
    activityStore:ActivityStore
}

export const store:Store={
     activityStore:new ActivityStore()
}

export const StoreContext = createContext(store) ;

//create hook to allow component to use our store
export function useStore(){
    return useContext(StoreContext);
}