import AppConfig from "@/config/config";
import BaseService from "./ApiService";

class AuthService extends BaseService {
    constructor() {
        super(`oAuth`);
    }

    public oAuthInstaURL = async (): Promise<void> => {
           window.location.href = `${AppConfig.INSTAGRAM_OAUTH_URL}`;
    }

    public async instaLogin(code: string): Promise<any> {
        return await this.post(`/instagram`, { code });
    }
   
}
let authServiceInstance: AuthService | null = null;
export type AuthServiceType = InstanceType<typeof AuthService>;
export const getAuthServiceInstance = (): AuthService => {
    if (!authServiceInstance) {
        authServiceInstance = new AuthService();
    }
    return authServiceInstance;
};
