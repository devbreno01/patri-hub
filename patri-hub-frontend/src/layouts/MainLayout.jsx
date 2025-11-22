import {Outlet} from "react-router-dom"
import { AppSidebar } from "@/components/AppSideBar"
import { SidebarProvider } from "@/components/ui/sidebar"

export function MainLayout(){
    return (
        <SidebarProvider>
            <AppSidebar/>
            <div className="w-full">
                <h2>CARALHO</h2>
            </div>
        </SidebarProvider>
    )
}