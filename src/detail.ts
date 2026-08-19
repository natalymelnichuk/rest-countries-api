import type { Country } from "./country";

const detailContainer = document.querySelector<HTMLElement>('#country-detail');
const backBtn = document.querySelector<HTMLButtonElement>('#back-btn');
const themeBtn = document.querySelector<HTMLButtonElement>('.theme-btn');

const useLocal = true

// get a code from url
const urlParams = new URLSearchParams(window.location.search);
const rawCode = urlParams.get('code');

if (!rawCode) {
    window.location.href = 'index.html';
}

async function loadCountryDetail(): Promise<void> {
    try {
        let countries: Country[] = [];

        if (useLocal) {

            const response = await fetch('/data.p.json');
            if (!response.ok) {
                throw new Error(`Local JSON Error: ${response.status}`);
            }
            const localData = await response.json();
            countries = localData.data?.objects || localData;

        } else {
            try {

                const limit = 100;
                let offset = 0;
                let hasMore = true;

                while (hasMore) {
                    const response = await fetch(`https://api.restcountries.com/countries/v5?limit=${limit}&offset=${offset}`, {
                        headers: { 'Authorization': 'Bearer rc_live_96dd1b07709b4772a22eb2f875b4ea4d' }
                    });

                    if (!response.ok) {
                        throw new Error(`API Error: ${response.status}`);
                    }

                    const apiData = await response.json();
                    const batch: Country[] = apiData.data?.objects || apiData;

                    if (!batch || batch.length === 0) {
                        hasMore = false;
                    } else {
                        countries = [...countries, ...batch];
                        if (batch.length < limit) {
                            hasMore = false;
                        } else {
                            offset += limit;
                        }
                    }
                }
            } catch (apiError) {
                console.warn('API error in detail.ts, falling back to local JSON:', apiError);
                const localResponse = await fetch('/data.p.json');
                if (!localResponse.ok) {
                    throw new Error(`Local JSON Error: ${localResponse.status}`);
                }
                const localData = await localResponse.json();
                countries = localData.data?.objects || localData;
            }
        }
        
        // Decode url and add LowerCase
        const targetCode = decodeURIComponent(rawCode!).toLowerCase().trim();

        // Find a country with any available code
        const country = countries.find((c) => {
            const alpha3 = c.codes?.alpha_3?.toLowerCase().trim();
            const uuid = (c.uuid || c.id)?.toLowerCase().trim();
            const name = c.names?.common?.toLowerCase().trim();

            return alpha3 === targetCode || uuid === targetCode || name === targetCode;
        });

        if (!country) {
            if (detailContainer) detailContainer.innerHTML = '<h2>Country not found</h2>';
            return;
        }

        renderDetail(country, countries);

    } catch (error) {
        console.error('Error loading country detail:', error);
        if (detailContainer) detailContainer.innerHTML = '<h2>Failed to load country data</h2>';
    }
}

function renderDetail(country: Country, allCountries: Country[]): void {
    if (!detailContainer) return;

    const flagSrc = country.flag?.url_png || country.flag?.url_svg || '';
    const name = country.names?.common || 'Unknown';
    const officialName = country.names?.official || name;
    const formattedPopulation = country.population ? country.population.toLocaleString('en-US') : 'N/A';
    const capitalName = country.capitals?.[0]?.name || 'N/A';
    
    const currencies = country.currencies?.map(c => c.name).join(', ') || 'N/A';
    const languages = country.languages?.map(l => l.name).join(', ') || 'N/A';

    let bordersHTML = '<p><strong>Border Countries:</strong> None</p>';

    if (country.borders && country.borders.length > 0) {
        const borderBtns = country.borders.map((borderCode) => {
            const cleanCode = borderCode.toLowerCase().trim();

            const borderCountry = allCountries.find((c) => {
                const alpha3 = c.codes?.alpha_3?.toLowerCase().trim();
                const uuid = (c.uuid || c.id)?.toLowerCase().trim();
                const name = c.names?.common?.toLowerCase().trim();
                return alpha3 === cleanCode || uuid === cleanCode || name === cleanCode;
            });

            const borderName = borderCountry?.names?.common || borderCode;

            return `<a href="detail.html?code=${encodeURIComponent(borderCode)}" class="border-btn">${borderName}</a>`;
        }).join('');

        bordersHTML = `
            <div class="border-countries">
                <strong>Border Countries:</strong>
                <div class="borders-list">
                    ${borderBtns}
                </div>
            </div>
        `;

        }

    detailContainer.innerHTML = `
        <div class="detail-flag">
            <img src="${flagSrc}" alt="${name} flag">
        </div>
        <div class="detail-info">
            <h2>${name}</h2>
            <div class="info-grid">
                <p><strong>Official Name:</strong> ${officialName}</p>
                <p><strong>Population:</strong> ${formattedPopulation}</p>
                <p><strong>Region:</strong> ${country.region || 'N/A'}</p>
                <p><strong>Sub Region:</strong> ${country.subregion || 'N/A'}</p>
                <p><strong>Capital:</strong> ${capitalName}</p>
                <p><strong>Currencies:</strong> ${currencies}</p>
                <p><strong>Languages:</strong> ${languages}</p>
            </div>
            ${bordersHTML}
        </div>
    `;
}

backBtn?.addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Localstorage

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

themeBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    const isDark = document.body.classList.contains('dark-theme');

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

loadCountryDetail();