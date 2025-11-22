import {Outlet} from "react-router-dom"
import { AppSidebar } from "@/components/AppSideBar"


export function MainLayout(){
    return (
        <div className="flex">
        
        <AppSidebar />

        
        <main className="flex-1 p-6">
            <Outlet />
        </main>
        </div>
    )
}