import { getServerSession } from "next-auth";
import { Dashboard } from "@/components";

export default function DashboardPage() {
    return <Dashboard />;
}
