import { Descendant, Editor, Location, Node, Point, Transforms } from 'slate';
import { Note } from '../../../models';

// for application service
export type EditorOutputData = { text: string; editorNodes: Descendant[] };

const deserialize = (text: string) => {
  return text.split('\n').map((line) => ({ children: [{ text: line }] }));
};

const serialize = (nodes: Descendant[]) => {
  return nodes.map(Node.string).join('\n');
};

export const makeEditorOutputData = (nodes: Descendant[]): EditorOutputData => {
  return { text: serialize(nodes), editorNodes: nodes };
};

export const resetNodes = (editor: Editor, options: { nodes?: Node | Node[]; at?: Location }) => {
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

export const getInitialEditorValue = (note: Note) => {
  if (note.editorNodes) {
    return JSON.parse(note.editorNodes);
  } else if (note.text) {
    return deserialize(note.text);
  } else {
    return [{ children: [{ type: 'paragraph', text: '' }] }];
  }
};
