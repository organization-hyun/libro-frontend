import api from './apiClient';

export const userBookApi = {

    setWish: async (bookId: number, wish: boolean): Promise<void> => {
        await api.post(`/user-book/interaction/${bookId}/wish`, {
            wish
        });
    },
};
