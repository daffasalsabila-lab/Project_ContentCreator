
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
} from "../../components/ui/sidebar";

import { Outlet } from "react-router-dom";
import Samping from "./Samping";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <Samping />
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <SidebarTrigger />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
