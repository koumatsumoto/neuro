import React from 'react';
import { Descendant, Editor, Location, Node, Point, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

const disableTabKey = (ev: React.KeyboardEvent) => {
  if (ev.key === 'Tab') {
    ev.preventDefault();
  }
};

const disableBrowserShortcuts = (ev: React.KeyboardEvent) => {
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

const enableSaveCommand = (ev: React.KeyboardEvent, callback: () => void) => {
  if (ev.ctrlKey || ev.metaKey) {
    if (ev.key === 's') {
      callback();
    }
  }
};

export const createKeyDownHandlers = (editor: ReactEditor, commands: { onSaveCommand: () => void }) => (ev: React.KeyboardEvent) => {
  disableTabKey(ev);
  disableBrowserShortcuts(ev);
  enableSaveCommand(ev, commands.onSaveCommand);
};

export const serialize = (nodes: Descendant[]) => {
  return nodes.map(Node.string).join('\n');
};

export const deserialize = (text: string) => {
  return text.split('\n').map((line) => ({ children: [{ text: line }] }));
};

export const resetNodes = (editor: ReactEditor, options: { nodes?: Node | Node[]; at?: Location }) => {
  const children = [...editor.children];

  children.forEach((node) => editor.apply({ type: 'remove_node', path: [0], node }));

  if (options.nodes) {
    const nodes = Node.isNode(options.nodes) ? [options.nodes] : options.nodes;
    nodes.forEach((node, i) => editor.apply({ type: 'insert_node', path: [i], node }));
  }

  const point = options.at && Point.isPoint(options.at) ? options.at : Editor.end(editor, []);
  if (point) {
    Transforms.select(editor, point);
  }
};