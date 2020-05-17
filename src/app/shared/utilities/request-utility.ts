import { Injectable } from '@angular/core';
import { HttpResponseBase } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RequestUtilities {

    public static splitInTwo(text: string, separator: string): { firstPart: string, secondPart: string } {
        let separatorIndex = text.indexOf
            (separator);

        if (separatorIndex == -1)
            return { firstPart: text, secondPart: null };

        let part1 = text.substr(0, separatorIndex).trim();
        let part2 = text.substr(separatorIndex + 1).trim();

        return { firstPart: part1, secondPart: part2 };
    }

    public static getQueryParamsFromString(paramString: string) {

        if (!paramString)
            return null;

        let params: { [key: string]: string } = {};

        for (let param of paramString.split("&")) {
            let keyValue = RequestUtilities.splitInTwo(param, "=");
            params[keyValue.firstPart] = keyValue.secondPart;
        }

        return params;
    }

    public static checkNoNetwork(response: HttpResponseBase) {
        if (response instanceof HttpResponseBase) {
            return response.status == 0;
        }

        return false;
    }

}
