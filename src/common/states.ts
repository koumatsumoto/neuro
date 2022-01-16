import { atom, selector, useRecoilValue } from 'recoil';
import { AppService } from './AppService';
import { AppStorage } from './AppStorage';
import { Note } from './types';

const appService = atom({
  key: 'atom/AppService',
  default: new AppService(new AppStorage()),
});

export const useAppService = () => {
  return useRecoilValue(appService);
};

export const notesQuery = selector<Note[]>({
  key: 'selector/notesQuery',
  get: ({ get }) => get(appService).loadSavedNotes(),
});
