export class OpenIdConfigs {
  public microsoftConfig: OpenIdConfig;
  public googleConfig: OpenIdConfig;  
}

export class OpenIdConfig {
  public isEnabled: boolean;
  public clientId: string;
  public authority: string;
  public signoutUrl: string;
  public redirectUrl: string;
}

export class SupportedOpenIdConfigs {
  public microsoft: boolean;
  public google: boolean;
}