
// import {
//   SidebarProvider,
//   Sidebar,
//   SidebarContent,
//   SidebarInset,
//   SidebarTrigger,
// } from "../../components/ui/sidebar";

// import { Outlet } from "react-router-dom";
// import Samping from "./Samping";

// export default function MainLayout() {
//   return (
//     <SidebarProvider>
//       <Sidebar>
//         <SidebarContent>
//           <Samping />
//         </SidebarContent>
//       </Sidebar>

//       <SidebarInset>
//         <SidebarTrigger />
//         <Outlet />
//       </SidebarInset>
//     </SidebarProvider>
//   );
// }

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
} from "../../components/ui/sidebar";

import { Outlet } from "react-router-dom";
import Samping from "./Samping";
import ThemeToggle from "../../components/ThemeToggle"; // Sesuaikan jalur jika diperlukan

export default function MainLayout() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <Samping />
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="min-h-screen bg-slate-50 dark:bg-slate-950 dark:text-slate-100">
        {/* Header Atas Dashboard */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200 px-6 bg-white dark:border-slate-800 dark:bg-slate-900">
          <SidebarTrigger />

          {/* Tombol Tema di Pojok Kanan Header */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>

        {/* Konten Halaman */}
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}