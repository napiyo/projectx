import BaseService from "./ApiService";

class PrivateReplyService extends BaseService {
    constructor() {
        super(`/privateReply`);
    }
    public async getUserDataFromDb(): Promise<any> {
        try {
            const response = await this.get<any>('/user/data');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    }

let privateReplyServiceInstance: PrivateReplyService | null = null;

export const getPrivateReplyServiceInstance = (baseURL: string): PrivateReplyService => {
    if (!privateReplyServiceInstance) {
        privateReplyServiceInstance = new PrivateReplyService();
    }
    return privateReplyServiceInstance;
};
