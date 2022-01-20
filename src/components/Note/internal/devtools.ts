import { Editor, Element, Node } from 'slate';
import { ReactEditor } from 'slate-react';
import { debug } from '../../../utils';

export const debugNodes = (editor: ReactEditor) => {
  debug('nodes', () =>
    Array.from(Node.nodes(editor)).map(([node, path]) => ({
      node,
      path,
      instanceof: Editor.isEditor(node) ? 'Editor' : Element.isElement(node) ? 'Block' : Node.isNode(node) ? 'Node' : 'unknown',
    })),
  );
};
