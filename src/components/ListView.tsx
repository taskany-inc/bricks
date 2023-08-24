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
    RefObject,
} from 'react';

import { useMounted } from '../hooks/useMounted';
import { useKeyPress } from '../hooks';

interface ListViewProps {
    onClick?: <T>(value: T) => void;
    onKeyboardClick?: <T>(value: T) => void;
    children: React.ReactNode;
}

interface ListViewContext {
    registerItem: (value: unknown) => number;
    items: RefObject<unknown[]>;
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

export const ListView: React.FC<ListViewProps> = ({ children, onKeyboardClick }) => {
    const downPress = useKeyPress('ArrowDown');
    const upPress = useKeyPress('ArrowUp');
    const spacePress = useKeyPress(' ');
    const enterPress = useKeyPress('Enter');
    const [cursor, setCursor] = useState<number | undefined>();
    const [hovered, setHovered] = useState<number | undefined>();
    const items = useRef<unknown[]>([]);

    const registerItem = useCallback((value: unknown) => items.current.push(value) - 1, [items]);

    useEffect(() => {
        if (downPress) {
            setCursor((prevState) => {
                if (prevState === undefined) return 0;
                if (prevState < items.current.length - 1) return prevState + 1;
                if (prevState === items.current.length - 1) return 0;

                return prevState;
            });

            setHovered(undefined);
        }
    }, [downPress]);

    useEffect(() => {
        if (upPress) {
            setCursor((prevState) => {
                if (prevState === undefined) return items.current.length - 1;
                if (prevState > 0) return prevState - 1;
                if (prevState === 0) return items.current.length - 1;

                return prevState;
            });

            setHovered(undefined);
        }
    }, [upPress]);

    useEffect(() => {
        if (cursor !== undefined && (spacePress || enterPress)) {
            onKeyboardClick?.(items.current[cursor]);
        }
    }, [cursor, spacePress, enterPress, items, onKeyboardClick]);

    useEffect(() => {
        if (hovered !== undefined && cursor !== undefined) {
            setCursor(hovered);
        }
    }, [items, hovered, cursor]);

    return (
        <listViewContext.Provider value={{ items, cursor, hovered, registerItem, setHovered }}>
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
    const { cursor, registerItem, setHovered, hovered } = useListViewContext();
    const mounted = useMounted();
    const id = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (mounted) {
            id.current = registerItem(value);
        }
    }, [mounted, registerItem, value]);

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
