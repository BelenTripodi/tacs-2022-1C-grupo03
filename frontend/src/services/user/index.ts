import tokenService, { TokenService } from "../token";
class UserService{
    private tokenService: TokenService;

    constructor(tokenService: TokenService){
        this.tokenService = tokenService;
    }

    private userInfo(){
        const decoded = this.tokenService.decodedToken();

        console.log(decoded);

        const sub = {
            username: decoded.sub,
            id: decoded.jti
        }

        return sub;
    }

    public username(){
        return this.userInfo().username;
    }

    public id(){
        return this.userInfo().id;
    }
}

export default new UserService(tokenService);