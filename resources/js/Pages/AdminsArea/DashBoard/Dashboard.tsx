import React from "react";
import Sidebar from "../../../Components/Admin/Sidebar";
import Navbar from "../../../Components/Admin/Navbar";

// export default function Dashboard() {
//     return (
//         <div>
//           <Sidebar />
//           <Navbar />
//         </div>
//     );
// }

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            // header={
            //     <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            //         Admin
            //     </h2>
            // }
        >
            <Head title="Dashboard" />
                <Sidebar />
                <Navbar />
          
        </AuthenticatedLayout>
    );
}
