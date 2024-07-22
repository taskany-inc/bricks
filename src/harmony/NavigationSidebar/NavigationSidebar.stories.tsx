import { Meta, StoryObj } from '@storybook/react';
import { IconBellOutline } from '@taskany/icons';

import { Link } from '../Link/Link';
import { TaskanyLogo } from '../TaskanyLogo/TaskanyLogo';

import { NavigationSidebar } from './NavigationSidebar';
import { Navigation } from './Navigation';
import { NavigationItem } from './NavigationItem';
import { NavigationSection } from './NavigationSection';
import { NavigationSidebarContent } from './NavigationSidebarContent';
import { NavigationSidebarHeader } from './NavigationSidebarHeader';
import { NavigationSidebarTitle } from './NavigationSidebarTitle';

const meta: Meta = {
    title: '@harmony/NavigationSidebar',
    component: NavigationSidebar,
};

export default meta;

const routes = new Array(3).fill(0).map((item, index) => ({ title: `item ${index + 1}`, href: '#' }));

export const Default: StoryObj<typeof NavigationSidebar> = {
    render: () => {
        return (
            <NavigationSidebar>
                <NavigationSidebarHeader>
                    <Link>
                        <TaskanyLogo />
                    </Link>
                    <NavigationSidebarTitle>Title</NavigationSidebarTitle>
                    <IconBellOutline size="s" />
                </NavigationSidebarHeader>
                <NavigationSidebarContent>
                    <Navigation>
                        <NavigationSection title="Section 1">
                            {routes.map(({ title, href }) => (
                                <NavigationItem key={title} href={href}>
                                    {title}
                                </NavigationItem>
                            ))}
                        </NavigationSection>

                        <NavigationSection title="Section 2">
                            {routes.map(({ title, href }) => (
                                <NavigationItem key={title} href={href}>
                                    {title}
                                </NavigationItem>
                            ))}
                        </NavigationSection>

                        <NavigationSection title="Section 3">
                            {routes.map(({ title, href }) => (
                                <NavigationItem key={title} href={href}>
                                    {title}
                                </NavigationItem>
                            ))}
                        </NavigationSection>
                    </Navigation>
                </NavigationSidebarContent>
            </NavigationSidebar>
        );
    },
};
