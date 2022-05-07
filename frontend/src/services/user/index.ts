import tokenService, { TokenService } from "../token";
class UserService{
    private tokenService: TokenService;

    constructor(tokenService: TokenService){
        this.tokenService = tokenService;
    }

    private userInfo(){
        const decoded = this.tokenService.decodedToken();

        const sub = {
            username: decoded.sub
        }

        return sub;
    }

    public username(){
        return this.userInfo().username;
    }
}

export default new UserService(tokenService);