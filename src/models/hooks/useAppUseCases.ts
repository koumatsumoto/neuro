import { atom, useRecoilValue } from 'recoil';
import { AppUseCases } from '../usecases';

const appUseCases = atom({
  key: 'atom/appUseCases',
  default: new AppUseCases(),
});

export const useAppUseCases = () => {
  return useRecoilValue(appUseCases);
};
