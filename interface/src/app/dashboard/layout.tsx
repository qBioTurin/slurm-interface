
import { Shell } from "@/components/";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Shell>{children}</Shell>
    );
}