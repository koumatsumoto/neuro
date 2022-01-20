import { atom, useRecoilValue } from 'recoil';
import { AppService } from './AppService';
import { AppStorage } from './AppStorage';

const appService = atom({
  key: 'atom/AppService',
  default: new AppService(new AppStorage()),
});

export const useAppService = () => {
  return useRecoilValue(appService);
};
