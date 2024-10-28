import axios from '../api';
import { IGetUser, type ICreateNewUser } from './hooks';

export const UserApi = {
  async getUser(payload: IGetUser) {
    const { userId } = payload;

    const { data } = await axios.get(`/user/${userId}`);

    return data;
  },
  async createNewUser(payload: ICreateNewUser) {
    const { data } = await axios.post('/user', payload);

    return data;
  },
};
