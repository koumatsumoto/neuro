import { atom, useRecoilValue } from 'recoil';
import { AppStorage } from './AppStorage';
import { AppUseCases } from './AppUseCases';

const appUseCases = atom({
  key: 'atom/appUseCases',
  default: new AppUseCases(new AppStorage()),
});

export const useAppUseCases = () => {
  return useRecoilValue(appUseCases);
};
