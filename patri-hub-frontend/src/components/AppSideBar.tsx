import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "./ui/navigation-menu"
//components/ui/navigation-menu
import { Link } from "react-router-dom"

export function AppSidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0 p-4">
      <h1 className="text-xl font-bold mb-6">PatriHub</h1>

      <NavigationMenu>
        <NavigationMenuList className="flex flex-col gap-3">
          <NavigationMenuItem>
            <Link to="/" className="hover:text-gray-300">🏠 Home</Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/" className="hover:text-gray-300">👤 Usuários</Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/" className="hover:text-gray-300">⚙️ Configurações</Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </aside>
  )
}
