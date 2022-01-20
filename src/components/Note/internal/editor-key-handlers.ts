import React from 'react';

export const disableTabKey = (ev: React.KeyboardEvent) => {
  if (ev.key === 'Tab') {
    ev.preventDefault();
  }
};

export const disableControlKeyShortcuts = (ev: React.KeyboardEvent) => {
  if (ev.ctrlKey || ev.metaKey) {
    switch (ev.key) {
      case 'd': // bookmark page
      case 'q': // quit browser. TODO(bug): not working
      case 'r': // reload page
      case 's': // save page
      case '`':
      case 'b':
      case 'w': {
        // close tab. TODO(bug): not working
        ev.preventDefault();
      }
    }
  }
};

export const onCtrlAnd = (key: string, handler: () => void) => {
  return (ev: React.KeyboardEvent) => {
    if (ev.ctrlKey || ev.metaKey) {
      if (ev.key === key) {
        handler();
      }
    }
  };
};
