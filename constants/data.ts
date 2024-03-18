import { Icons } from "@/components/icons";
import { NavItem, SidebarNavItem } from "@/types";

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
  email: string;
};
export const users: User[] = [
  {
    id: 1,
    name: "Devansh Gupta",
    company: "Dell",
    email: "03devansh.gupta@gmail.com",
    role: "Frontend Developer",
    verified: false,
    status: "Active",
  },
  {
    id: 2,
    name: "Nilay Sharan",
    company: "TechCorp",
    email: "nilaynathsharan16@gmail.com",
    role: "Backend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 3,
    name: "Kashish Dhoka",
    company: "WebTech",
    email: "kashishdhoka418@gmail.com",
    role: "UI Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 4,
    name: "Kritin Bhardwaj",
    company: "Innovate Inc.",
    email: "krit.bhardwaj@gmail.com",
    role: "Fullstack Developer",
    verified: false,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Harshal Ranjhani",
    company: "TechGuru",
    email: "ranjhaniharshal02@gmail.com",
    role: "Product Manager",
    verified: true,
    status: "Active",
  },
  {
    id: 6,
    name: "Bobby Patel",
    company: "CodeGenius",
    email: "bobby@yogirt.com",
    role: "QA Engineer",
    verified: false,
    status: "Active",
  },
  // {
  //   id: 7,
  //   name: "Laura White",
  //   company: "SoftWorks",
  //   email: "bobby@yogirt.com",
  //   role: "UX Designer",
  //   verified: true,
  //   status: "Active",
  // },
  // {
  //   id: 8,
  //   name: "Michael Lee",
  //   company: "DevCraft",
  //   email: "bobby@yogirt.com",
  //   role: "DevOps Engineer",
  //   verified: false,
  //   status: "Active",
  // },
  // {
  //   id: 9,
  //   name: "Olivia Green",
  //   company: "WebSolutions",
  //   email: "bobby@yogirt.com",
  //   role: "Frontend Developer",
  //   verified: true,
  //   status: "Active",
  // },
  // {
  //   id: 10,
  //   name: "Robert Taylor",
  //   company: "DataTech",
  //   email: "bobby@yogirt.com",
  //   role: "Data Analyst",
  //   verified: false,
  //   status: "Active",
  // },
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Recruiters",
    href: "/dashboard/user",
    icon: "user",
    label: "user",
  },
  // {
  //   title: "Companies",
  //   href: "/dashboard/employee",
  //   icon: "building",
  //   label: "Company",
  // },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: "profile",
    label: "profile",
  },
  // {
  //   title: "Kanban",
  //   href: "/dashboard/kanban",
  //   icon: "kanban",
  //   label: "kanban",
  // },
];
