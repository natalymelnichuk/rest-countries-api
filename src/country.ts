
export interface CountryName {
    common: string;
    official?: string;
    native?: Record<string, { official: string; common: string }>;
    alternates?: string[];
}

export interface CapitalName {
    name: string;
    attributes?: {
        administrative: boolean;
        constitutional: boolean;
        executive: boolean;
        judicial: boolean;
        legislative: boolean;
        primary: boolean;
    };
    coordinates?: {
        lat: number;
        lng: number;
    }
}

export interface CountryFlag {
    colors?: {
        dominant: string;
        palette: Record<string, unknown>[];
    };
    prominent?: string;
    description?: string;
    emoji?: string;
    html_entity?: string;
    unicode?: string;
    url_png: string;
    url_svg: string;
}

export interface Currency {
    code?: string;
    name: string;
    symbol?: string;
}

export interface Language {
    bcp47?: string;
    iso639_1?: string;
    name: string;
    native_name?: string;
}

export interface CountryCode {
    alpha_2?: string;
    alpha_3?: string;
    ccn3?: string;
    cioc?: string;
    name?: string;
}

export interface Country {
    names: CountryName; 
    codes?: CountryCode;
    capitals?: CapitalName[];
    region?: string;
    subregion?: string;
    population?: number;
    borders?: string[];
    flag?: CountryFlag;
    currencies?: Currency[];
    languages?: Language[];
    uuid?: string;
    id?: string;
}
