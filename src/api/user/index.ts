import service from '@/service/fetch';
import { InterUserItems } from '@/types/user';

/** 获取用户信息（自己） */
export function axiosGetAccountInfo(): Promise<
  API.DetailResponse<InterUserItems>
> {
  return service.get('/users/info');
}
