import type { Country } from "./country";

let allCountries: Country[] = [];

const localDataJSON = true;

async function loadCountries(): Promise<void> {

    try {

        if(localDataJSON) {
            throw new Error("Use a local data file to save on limited requests.")
        }

        const response = await fetch(
        'https://api.restcountries.com/countries/v5-disable',
        { headers: { 'Authorization': 'Bearer rc_live_96dd1b07709b4772a22eb2f875b4ea4d' } }
        );
        if(!response.ok) {
            throw new Error(`API Error: ${response.status}`)
        }
        const jsonResult = await response.json();

        allCountries = jsonResult.data?.objects || jsonResult

        console.log("Data succesefully received from API")
    } catch (error) {
        console.log("API is not available, connect to local data.json file", error);
        try {      
            const localResponse = await fetch('/data.p.json');
            if(!localResponse.ok) {
                throw new Error (`Local file error: ${localResponse.status}`)
            }

            const localData = await localResponse.json();

            allCountries = localData.data?.objects || localData;
            console.log("Data succesefully received from local data.json")
        } catch (localError) {
            console.error("The data is not available from local file")
        }
    }
}

loadCountries();


