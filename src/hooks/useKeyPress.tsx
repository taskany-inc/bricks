import { useState, useEffect } from 'react';

const noop = () => {};

export const useKeyPress = (targetKey: string | null) => {
    const [keyPressed, setKeyPressed] = useState(false);

    const downHandler = targetKey
        ? (e: KeyboardEvent) => {
              if (e.key === targetKey) {
                  e.preventDefault();
                  setKeyPressed(true);
              }
          }
        : noop;

    const upHandler = targetKey
        ? (e: KeyboardEvent) => {
              if (e.key === targetKey) {
                  e.preventDefault();
                  setKeyPressed(false);
              }
          }
        : noop;

    useEffect((): void | (() => void) => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    });

    return keyPressed;
};
