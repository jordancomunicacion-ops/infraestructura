
import { auth } from "@/auth";
import { LivestockApp } from "@/components/LivestockApp";

export default async function DashboardPage() {
    const session = await auth();

    return (
        <LivestockApp session={session} />
    );
}
