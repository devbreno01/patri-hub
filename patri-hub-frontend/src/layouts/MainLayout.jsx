import {Outlet} from "react-router-dom"
import { AppSidebar } from "@/components/AppSideBar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

export function MainLayout(){
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 md:px-6">
                    <SidebarTrigger className="-ml-1" />
                </header>
                <div className="w-full p-6">
                    <Outlet />  
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}