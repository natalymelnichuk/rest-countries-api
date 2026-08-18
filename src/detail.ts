import type { Country } from "./country";

const detailContainer = document.querySelector<HTMLElement>('#country-detail');
const backBtn = document.querySelector<HTMLButtonElement>('#back-btn');
const themeBtn = document.querySelector<HTMLButtonElement>('.theme-btn');

// get a code from url
const urlParams = new URLSearchParams(window.location.search);
const rawCode = urlParams.get('code');

if (!rawCode) {
    window.location.href = 'index.html';
}

async function loadCountryDetail(): Promise<void> {
    try {
        const response = await fetch('/data.p.json');
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const localData = await response.json();
        const countries: Country[] = localData.data?.objects || localData;

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

        renderDetail(country);

    } catch (error) {
        console.error('Error loading country detail:', error);
        if (detailContainer) detailContainer.innerHTML = '<h2>Failed to load country data</h2>';
    }
}

function renderDetail(country: Country): void {
    if (!detailContainer) return;

    const flagSrc = country.flag?.url_png || country.flag?.url_svg || '';
    const name = country.names?.common || 'Unknown';
    const officialName = country.names?.official || name;
    const formattedPopulation = country.population ? country.population.toLocaleString('en-US') : 'N/A';
    const capitalName = country.capitals?.[0]?.name || 'N/A';
    
    const currencies = country.currencies?.map(c => c.name).join(', ') || 'N/A';
    const languages = country.languages?.map(l => l.name).join(', ') || 'N/A';

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
        </div>
    `;
}

backBtn?.addEventListener('click', () => {
    window.location.href = 'index.html';
});

themeBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

loadCountryDetail();