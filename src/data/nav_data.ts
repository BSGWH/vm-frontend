import { Icons } from "@/components/icons";
import { NavItem} from "@/types";



export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "My Vehicles",
    href: "/dashboard/vehicles",
    icon: "MyVehicles",
    label: "MyVehicles",
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: "Documents",
    label: "Documents",
  },
  {
    title: "Logs",
    href: "/dashboard/logs",
    icon: "Logs",
    label: "Logs",
  },
  {
    title: "Insights",
    href: "/dashboard/insights",
    icon: "Insights",
    label: "Insights",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: "Settings",
    label: "Settings",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: "Profile",
    label: "profile",
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