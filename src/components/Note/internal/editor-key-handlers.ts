import React from 'react';

export const disableTabKey = (ev: React.KeyboardEvent) => {
  if (ev.key === 'Tab') {
    ev.preventDefault();
  }
};

export const disableBrowserShortcuts = (ev: React.KeyboardEvent) => {
  if (ev.ctrlKey || ev.metaKey) {
    switch (ev.key) {
      case 'd': // bookmark page
      case 'q': // quit browser. TODO(bug): not working
      case 'r': // reload page
      case 's': // save page
      case 'w': {
        // close tab. TODO(bug): not working
        ev.preventDefault();
      }
    }
  }
};
