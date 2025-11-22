import { Home, Inbox, Search, Settings, ChevronRight } from "lucide-react"
import { 
  Sidebar,
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "./ui/sidebar";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Patrimônios",
    url: "/assets",
    icon: Inbox,
  },
  {
    title: "Herdeiros",
    url: "/heirs",
    icon: Search,
  },
  {
    title: "Associate",
    url: "/associate",
    icon: Settings,
  }
]; 

export function AppSidebar() {
  return (
    <Sidebar className="border-r-0">
      {/* Header with Logo */}
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <div>
            <h2 className="font-extrabold text-gray-800">PATRIHUB</h2>
            <p className="text-xs text-gray-500">Controle de Patrimônio</p>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation Menu - Centered */}
      <SidebarContent className="flex flex-col justify-center px-4">
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider px-3 mb-3">
            Menu
          </p>
          <SidebarMenu>
            {items.map((item, index) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild
                  className="group relative h-12 rounded-xl transition-all duration-200 hover:bg-gradient-to-r hover:from-violet-50 hover:to-indigo-50 hover:shadow-md hover:shadow-violet-100 data-[active=true]:bg-gradient-to-r data-[active=true]:from-violet-500 data-[active=true]:to-indigo-600 data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:shadow-violet-500/30"
                >
                  <a href={item.url} className="flex items-center gap-3 px-3">
                    <div className="p-2 rounded-lg bg-white shadow-sm group-hover:shadow group-hover:bg-violet-100 transition-all duration-200 group-data-[active=true]:bg-white/20 group-data-[active=true]:shadow-none">
                      <item.icon className="h-4 w-4 text-violet-600 group-data-[active=true]:text-white" />
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-violet-700 group-data-[active=true]:text-white">
                      {item.title}
                    </span>
                    <ChevronRight className="h-4 w-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-violet-400 group-data-[active=true]:text-white/70" />
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>

      {/* Footer with User */}
      <SidebarFooter className="p-4">
        <div className="rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white font-medium shadow-md">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">Usuário</p>
              <p className="text-xs text-gray-500 truncate">user@email.com</p>
            </div>
            <Settings className="h-4 w-4 text-gray-400 hover:text-violet-500 cursor-pointer transition-colors" />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}