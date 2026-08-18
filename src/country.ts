
export interface CountryName {
    common: string;
    official?: string;
    native?: Record<string, { official: string; common: string }>;
    alternates?: string[];
}

export interface Currency {
    name: string;
    symbol?: string;
}

export interface Country {
    names: CountryName; 
    cca3: string;
    capital?: string[];
    region: string;
    subregion?: string;
    population: number;
    latlng?: number[];
    borders?: string[];
    flags?: {
        png: string;
        svg: string;
        alt?: string;
    };
    currencies?: Record<string, Currency>;
    languages?: Record<string, string>;
}
