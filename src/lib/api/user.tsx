
import BaseService from "./ApiService";

class MeService extends BaseService {
    constructor() {
        super(`me`);
    }



    public async getMyData(): Promise<any> {
        return await this.get(`/`);
    }
   
}
let meServiceInstance: MeService | null = null;
export type MeServiceType = InstanceType<typeof MeService>;
export const getMeServiceInstance = (): MeService => {
    if (!meServiceInstance) {
        meServiceInstance = new MeService();
    }
    return meServiceInstance;
};
