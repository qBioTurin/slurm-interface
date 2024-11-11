'use client';
import { IconHome, IconCpu2, IconBriefcase2, IconCalendarClock } from '@tabler/icons-react';
import classes from './navbar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const data = [
    { label: 'Dashboard', href: '/dashboard', icon: IconHome },
    { label: 'Nodes', href: '/dashboard/nodes', icon: IconCpu2 },
    { label: 'Jobs', href: '/dashboard/jobs', icon: IconBriefcase2 },
    { label: 'Reservations', href: '/dashboard/reservations', icon: IconCalendarClock },
];


export default function NavBar() {
    const pathname = usePathname();

    const links = data.map((item) => {
        const LinkIcon = item.icon;
        const isActive = pathname === item.href;

        return (
            <Link href={item.href} key={item.label} passHref legacyBehavior>
                <a className={`${classes.link} ${isActive ? classes.active : ''}`}>
                    <LinkIcon className={classes.linkIcon} stroke={1.5} />
                    <span>{item.label}</span>
                </a>
            </Link>
        );
    });


    return (
        <div className={classes.navbarMain}>
            {links}
        </div>
    );
}