import axios from '../api';

export interface IGetHistoryById {
  historyId: number;
}

export const HistoryApi = {
  async getAllHistories() {
    const userId = localStorage.getItem("user");
    const { data } = await axios.get(`/histories-user/${userId}`);
    return data;
  },
  async deleteHistory(payload: IGetHistoryById) {
    const { historyId } = payload;
    const { data } = await axios.delete(`/history/${historyId}`);
    return data;
  },
};
