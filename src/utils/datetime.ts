import { formatDistanceToNow } from 'date-fns';
import ja from 'date-fns/locale/ja';

export const distanceToNow = (timestamp: number) => {
  return formatDistanceToNow(timestamp, { addSuffix: true, locale: ja });
};
