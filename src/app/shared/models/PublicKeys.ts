export class PublicKeys {
    constructor(publicKeyXml: string, publicKeyPem: string) {
        this.publicKeyXml = publicKeyXml;
        this.publicKeyPem = publicKeyPem;
    }
    public publicKeyXml: string;
    public publicKeyPem: string;
}
