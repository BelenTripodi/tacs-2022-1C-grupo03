import jwt_decode from "jwt-decode";

class TokenService{
    public decodedToken(): any{
        const token = localStorage.getItem("jwt");

        if(token){
            return this.decode(token)
        } else {
            throw Error("There's not token in the storage");
        }
    }

    private decode(token: string){
        return jwt_decode(token);
    }
}

export { TokenService };

export default new TokenService();