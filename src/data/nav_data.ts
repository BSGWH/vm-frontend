import { Icons } from "@/components/icons";
import { NavItem} from "@/types";



export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/customer/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Profile",
    href: "/customer/dashboard/profile",
    icon: "Profile",
    label: "profile",
  },
  {
    title: "My Vehicles",
    href: "/customer/dashboard/vehicles",
    icon: "MyVehicles",
    label: "MyVehicles",
  },
  {
    title: "My Services",
    href: "/customer/dashboard/services",
    icon: "MySeivices",
    label: "MySeivices",
  },
  {
    title: "My Documents",
    href: "/customer/dashboard/documents",
    icon: "Documents",
    label: "Documents",
  },
  {
    title: "Logs",
    href: "/customer/dashboard/logs",
    icon: "Logs",
    label: "Logs",
  },
  {
    title: "Insights",
    href: "/customer/dashboard/insights",
    icon: "Insights",
    label: "Insights",
  },
  {
    title: "Settings",
    href: "/customer/dashboard/settings",
    icon: "Settings",
    label: "Settings",
  },
  
  
];


export const providerNavItems: NavItem[]= [
  {
    title: "My Dashboard",
    href: "/provider/dashboard-provider",
    icon: "dashboard",
    label: "My Dashboard",
  },

  {
    title: "Service",
    href: "/provider/dashboard-provider/provider-service",
    icon: "Service",
    label: "Service",
  },

  {
    title: "Settings",
    href: "/provider/dashboard-provider/settings",
    icon: "Settings",
    label: "Settings",
  },
  {
    title: "Profile",
    href: "/provider/dashboard-provider/profile",
    icon: "Profile",
    label: "profile",
  },
]
