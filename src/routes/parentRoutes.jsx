import { Layout } from "@/components/Layout";

export const ParentRoutes = [
  {
    roles: ["Admin", "Admin Manager", "Super Admin"],
    routes: [
      {
        isLayout: true,
        path: "/",
        element: <Layout outletClass="bg-[var(--color-bg-2)]"/>,
      },
    ],
  },
];
