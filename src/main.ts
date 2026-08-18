import type { Country } from "./country";

const countriesContainer = document.querySelector<HTMLElement>('#countries-container');

let allCountries: Country[] = [];

const localDataJSON = true;

async function fetchAllCountries(): Promise< Country[] >{
    const limit = 100;
    const offsets = [0, 100, 200];

    const requests = offsets.map((offset) => 
        fetch(`https://api.restcountries.com/countries/v5?limit=${limit}&offset=${offset}`,
        { headers: { 'Authorization': 'Bearer rc_live_96dd1b07709b4772a22eb2f875b4ea4d' } }
        ).then((res) => {
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        return res.json();
        })
    );
    const results = await Promise.all(requests);

    return results.flatMap((jsonResult) => jsonResult.data?.objects || jsonResult)
}

// Render Function

function renderCountries(countries: Country[]): void {
    if (!countriesContainer) {
        console.error("The container wasn't found in HTML")
        return;
    }

    // Clear up previous info
    countriesContainer.innerHTML = '';

    // Render each country

    countries.forEach((country) => {
        const card = document.createElement('article');
        card.classList.add('country-card');

        const formattedPopulation = country.population ? country.population.toLocaleString('en-US') : 'N/A';
        const capitalName = country.capitals?.[0]?.name || 'N/A';
        const flagSrc = country.flag?.url_png || country.flag?.url_svg || '';
        const countryCode = country.codes?.alpha_3 || '';

        card.innerHTML = `
            <div class="card-flag">
                <img src="${flagSrc}" alt="${country.flag?.description || country.names.common + ' flag'}" loading="lazy">
            </div>
            <div class="card-body">
                <h2 class="country-title">${country.names.common}</h2>
                <p><strong>Population:</strong> ${formattedPopulation}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${capitalName}</p>
            </div>
        `;

        card.addEventListener('click', () => {
            console.log('Click:', countryCode);
        });

        countriesContainer.appendChild(card);
    })

}

// Function to load all countries from REST API with fetch and alternatively from data.json

async function loadCountries(): Promise<void> {
    try {

        if(localDataJSON) {
            throw new Error("Use a local data file to save on limited requests.")
        }

        allCountries = await fetchAllCountries();

        console.log(`Successfully received ${allCountries.length} countries from API`);
        renderCountries(allCountries);
    } catch (error) {
        console.log("API is not available, connect to local data.json file", error);
        try {
            const localResponse = await fetch('/data.p.json');
            if(!localResponse.ok) {
                throw new Error (`Local file error: ${localResponse.status}`)
            }

            const localData = await localResponse.json();

            allCountries = localData.data?.objects || localData;
            console.log(allCountries);
            console.log(`Data succesefully received for ${allCountries.length} countries from local data.json`);
            renderCountries(allCountries);
        } catch (localError) {
            console.error("The data is not available from local file")
        }
    }
}

loadCountries();


