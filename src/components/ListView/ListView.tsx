import React, {
    Dispatch,
    SetStateAction,
    createContext,
    memo,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

import { useMounted } from '../../hooks/useMounted';
import { useKeyPress } from '../../hooks';

interface ListViewProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick?: (value: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onKeyboardClick?: (value: any) => void;
    children: React.ReactNode;
}

interface ListViewContext {
    registerItem: () => number;
    mountItem: (id: number, value: unknown) => void;
    items: unknown[];
    cursor?: number;
    hovered?: number;
    setHovered?: Dispatch<SetStateAction<undefined | number>>;
}
const listViewContext = createContext<ListViewContext | undefined>(undefined);

const useListViewContext = () => {
    const ctx = useContext(listViewContext);

    if (!ctx) {
        throw new Error('Dont use element outside of `ListView` component');
    }

    return ctx;
};

type List = Map<number, unknown>;

const listNavigation = (() => {
    const lists = new Set<List>();
    const callbacks = new Set<(active: List) => void>();

    const notifySubscriptions = () => {
        const activeIndex = lists.size - 1;
        const activeItem = Array.from(lists.values())[activeIndex];

        callbacks.forEach((cb) => {
            cb(activeItem);
        });
    };

    const changeLists = (action: 'add' | 'delete', list: List) => {
        const oldSize = lists.size;

        lists[action](list);

        if (oldSize !== lists.size) {
            notifySubscriptions();
        }
    };

    return {
        mount: (list: List) => {
            changeLists('add', list);
        },
        unmount: (list: List) => {
            changeLists('delete', list);
        },
        subscribe: (cb: (active: List) => void) => {
            callbacks.add(cb);

            return () => callbacks.delete(cb);
        },
    };
})();

const useListNavigation = (initialList: List) => {
    const [isActive, setIsActive] = useState(false);
    const [list] = useState(initialList);

    useEffect(() => {
        const unsubscribe = listNavigation.subscribe((active) => {
            setIsActive(active === list);
        });

        listNavigation.mount(list);

        return () => {
            unsubscribe();
            listNavigation.unmount(list);
        };
    }, [list]);

    const setActive = useCallback(() => {
        listNavigation.unmount(list);
        listNavigation.mount(list);
    }, [list]);

    return {
        active: isActive,
        setActive,
    };
};

const registerItem = (() => {
    let id = 0;

    return () => id++;
})();

export const ListView: React.FC<ListViewProps> = ({ children, onKeyboardClick }) => {
    const [cursor, setCursor] = useState<number | undefined>();
    const [hovered, setHovered] = useState<number | undefined>();
    const items = useRef<Map<number, unknown>>(new Map());

    const { active, setActive } = useListNavigation(items.current);

    const downPress = useKeyPress(active ? 'ArrowDown' : null);
    const upPress = useKeyPress(active ? 'ArrowUp' : null);
    const spacePress = useKeyPress(active ? ' ' : null);
    const enterPress = useKeyPress(active ? 'Enter' : null);

    const mountItem = useCallback((id: number, value: unknown) => {
        items.current.set(id, value);
    }, []);

    useEffect(() => {
        if (downPress) {
            setCursor((prevState) => {
                const ids = Array.from(items.current.keys());
                const index = prevState !== undefined ? ids.indexOf(prevState) : 0;

                if (prevState === undefined || index === ids.length - 1) return ids[0];
                if (index < ids.length - 1) return ids[index + 1];

                return prevState;
            });

            setHovered(undefined);
        }
    }, [downPress]);

    useEffect(() => {
        return () => {
            items.current.clear();
        };
    });

    useEffect(() => {
        if (upPress) {
            setCursor((prevState) => {
                const ids = Array.from(items.current.keys());
                const index = prevState !== undefined ? ids.indexOf(prevState) : 0;

                if (prevState === undefined || index === 0) return ids[ids.length - 1];
                if (index > 0) return ids[index - 1];

                return prevState;
            });

            setHovered(undefined);
        }
    }, [upPress]);

    useEffect(() => {
        if (cursor !== undefined && (spacePress || enterPress)) {
            onKeyboardClick?.(items.current.get(cursor));
        }
    }, [cursor, spacePress, enterPress, items, onKeyboardClick]);

    useEffect(() => {
        if (hovered !== undefined && cursor !== undefined) {
            setCursor(hovered);
        }
    }, [items, hovered, cursor]);

    useEffect(() => {
        if (hovered) {
            setActive();
        }
    }, [hovered]);

    return (
        <listViewContext.Provider
            value={{ items: Array.from(items.current.values()), cursor, hovered, registerItem, mountItem, setHovered }}
        >
            {children}
        </listViewContext.Provider>
    );
};

interface ListViewItemChildProps {
    active?: boolean;
    hovered?: boolean;
    onMouseMove: React.MouseEventHandler<HTMLElement>;
    onMouseLeave: React.MouseEventHandler<HTMLElement>;
}

interface ListViewItemProps {
    renderItem: (props: ListViewItemChildProps) => React.ReactNode;
    value?: unknown;
}

export const ListViewItem: React.FC<ListViewItemProps> = memo(({ renderItem, value }) => {
    const { cursor, registerItem, mountItem, setHovered, hovered } = useListViewContext();
    const mounted = useMounted();
    const id = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (mounted) {
            id.current = registerItem();
        }
    }, [mounted, registerItem, value]);

    useEffect(() => {
        if (typeof id.current === 'number') {
            mountItem(id.current, value);
        }
    });

    const onMouseLeave = useCallback<React.MouseEventHandler<HTMLElement>>(() => {
        setHovered?.(undefined);
    }, [setHovered]);

    const onMouseMove = useCallback<React.MouseEventHandler<HTMLElement>>(() => {
        if (hovered !== id.current) {
            setHovered?.(id.current);
        }
    }, [setHovered, hovered]);

    return renderItem({
        active: cursor !== undefined && id.current === cursor,
        hovered: hovered !== undefined && id.current === hovered,
        onMouseLeave,
        onMouseMove,
    });
});
