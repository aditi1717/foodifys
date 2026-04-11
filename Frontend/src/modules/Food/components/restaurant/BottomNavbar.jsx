import { useNavigate, useLocation } from "react-router-dom"
import { Home, ShoppingBag, Store, Wallet, Menu } from "lucide-react"
import BRAND_THEME from "@/config/brandTheme"

export default function BottomNavbar({ onMenuClick }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { navigation } = BRAND_THEME.tokens

  const isActive = (path) => {
    if (path === "/restaurant") {
      return location.pathname === "/restaurant"
    }
    return location.pathname.startsWith(path)
  }

  const items = [
    {
      key: "home",
      label: "Home",
      path: "/restaurant",
      icon: Home,
      onClick: () => navigate("/restaurant"),
    },
    {
      key: "orders",
      label: "Orders",
      path: "/restaurant/orders",
      icon: ShoppingBag,
      onClick: () => navigate("/restaurant/orders"),
    },
    {
      key: "store",
      label: "Store",
      path: "/restaurant/details",
      icon: Store,
      onClick: () => navigate("/restaurant/details"),
    },
    {
      key: "wallet",
      label: "Wallet",
      path: "/restaurant/wallet",
      icon: Wallet,
      onClick: () => navigate("/restaurant/wallet"),
    },
    {
      key: "menu",
      label: "Menu",
      path: "/restaurant/food/all",
      icon: Menu,
      onClick: (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (onMenuClick && typeof onMenuClick === "function") {
          onMenuClick(e)
          return
        }
        navigate("/restaurant/food/all")
      },
    },
  ]

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 ${navigation.surface} border-t ${navigation.border} z-50 shadow-lg`}
    >
      <div className="flex items-center justify-around h-auto px-2 sm:px-4">
        {items.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)

          return (
            <button
              key={item.key}
              type="button"
              onClick={item.onClick}
              className={`flex flex-1 flex-col items-center gap-1.5 px-2 sm:px-3 py-2 transition-all duration-200 relative ${
                active ? navigation.activeText : navigation.inactiveText
              }`}
            >
              <Icon
                className={`h-5 w-5 ${active ? navigation.activeText : navigation.inactiveText}`}
                strokeWidth={2}
              />
              <span
                className={`text-xs sm:text-sm font-medium ${
                  active ? `${navigation.activeText} font-semibold` : navigation.inactiveText
                }`}
              >
                {item.label}
              </span>
              {active && (
                <div className={`absolute top-0 left-0 right-0 h-0.5 ${navigation.indicator} rounded-b-full`} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}


