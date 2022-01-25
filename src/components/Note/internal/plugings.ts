import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

const key = new PluginKey('focus');

// @see https://discuss.prosemirror.net/t/handling-focus-in-plugins/1981/5
export const focusPlugin = ({ onFocus, onBlur }: { onFocus?: (view: EditorView) => void; onBlur?: (view: EditorView) => void }) =>
  new Plugin({
    key,
    state: {
      init() {
        return false;
      },
      apply(transaction, prevFocused) {
        let focused = transaction.getMeta(key);
        if (typeof focused === 'boolean') {
          return focused;
        }
        return prevFocused;
      },
    },
    props: {
      handleDOMEvents: {
        blur: (view) => {
          view.dispatch(view.state.tr.setMeta(key, false));
          onBlur?.(view);
          return false;
        },
        focus: (view) => {
          view.dispatch(view.state.tr.setMeta(key, true));
          onFocus?.(view);
          return false;
        },
      },
    },
  });
