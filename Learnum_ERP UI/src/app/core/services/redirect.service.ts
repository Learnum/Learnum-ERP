import { Injectable } from "@angular/core";

@Injectable()
export class RedirectService
{
    constructor()
    {
        
    }

    EncodeURL(url:string)
    {
        return btoa(url);
    }

    DecodeURL(encodedUrl:string)
    {
        return atob(encodedUrl);
    }
}