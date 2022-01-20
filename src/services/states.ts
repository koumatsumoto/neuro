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
