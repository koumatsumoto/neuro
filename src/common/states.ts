import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { AppService } from './AppService';
import { AppStorage } from './AppStorage';

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
