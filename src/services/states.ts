import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { AppService } from './AppService';
import { AppStorage } from './AppStorage';
import { EditorController } from './EditorController';

const appService = atom({
  key: 'atom/AppService',
  default: new AppService(new AppStorage()),
});

export const useAppService = () => {
  return useRecoilValue(appService);
};

type UiState = 'default' | 'editing-note';
const uiState = atom<UiState>({
  key: 'atom/uiState',
  default: 'default',
});

export const useUiState = () => {
  return useRecoilValue(uiState);
};

export const useSetUiState = () => {
  return useRecoilState(uiState)[1];
};

const editorController = atom<EditorController | null>({
  key: 'atom/EditorController',
  default: null,
});

export const useEditorController = () => {
  return useRecoilValue(editorController);
};

export const useSetEditorController = () => {
  return useRecoilState(editorController)[1];
};
