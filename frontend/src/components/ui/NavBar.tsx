import { Link } from 'react-router-dom'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink
} from './navigation-menu'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm px-6 py-4 w-full">
      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-6 w-full">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/" className="text-lg font-semibold hover:text-blue-600">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/about" className="text-lg font-semibold hover:text-blue-600">About</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Push Sign In/Up to the right */}
          <div className="ml-auto flex gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/signin" className="text-lg font-semibold hover:text-blue-600">Sign In</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/signup" className="text-lg font-semibold hover:text-blue-600">Sign Up</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}

export default Navbar
