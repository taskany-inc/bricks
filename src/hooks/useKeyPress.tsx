import { useState, useEffect } from 'react';

const noop = () => {};

const inputNodes = ['INPUT', 'TEXTAREA'];

export const useKeyPress = (targetKey: string | null) => {
    const [keyPressed, setKeyPressed] = useState(false);

    const downHandler = targetKey
        ? (e: KeyboardEvent) => {
              if (e.target instanceof HTMLElement) {
                  if (inputNodes.includes(e.target.nodeName)) {
                      return;
                  }
              }

              if (e.key === targetKey) {
                  e.preventDefault();
                  setKeyPressed(true);
              }
          }
        : noop;

    const upHandler = targetKey
        ? (e: KeyboardEvent) => {
              if (e.target instanceof HTMLElement) {
                  if (inputNodes.includes(e.target.nodeName)) {
                      return;
                  }
              }

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
