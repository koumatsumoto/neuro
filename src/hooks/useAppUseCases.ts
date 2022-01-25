import { atom, useRecoilValue } from 'recoil';
import { AppUseCases } from '../models';

const appUseCases = atom({
  key: 'atom/appUseCases',
  default: new AppUseCases(),
});

export const useAppUseCases = () => {
  return useRecoilValue(appUseCases);
};
