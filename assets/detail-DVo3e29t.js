import"./style-C-1hbFCJ.js";var e=document.querySelector(`#country-detail`),t=document.querySelector(`#back-btn`),n=document.querySelector(`.theme-btn`),r=new URLSearchParams(window.location.search).get(`code`);r||(window.location.href=`index.html`);async function i(){try{let t=[];{let e=await fetch(`/data.p.json`);if(!e.ok)throw Error(`Local JSON Error: ${e.status}`);let n=await e.json();t=n.data?.objects||n}let n=decodeURIComponent(r).toLowerCase().trim(),i=t.find(e=>{let t=e.codes?.alpha_3?.toLowerCase().trim(),r=(e.uuid||e.id)?.toLowerCase().trim(),i=e.names?.common?.toLowerCase().trim();return t===n||r===n||i===n});if(!i){e&&(e.innerHTML=`<h2>Country not found</h2>`);return}a(i,t)}catch(t){console.error(`Error loading country detail:`,t),e&&(e.innerHTML=`<h2>Failed to load country data</h2>`)}}function a(t,n){if(!e)return;let r=t.flag?.url_png||t.flag?.url_svg||``,i=t.names?.common||`Unknown`,a=t.names?.official||i,o=t.population?t.population.toLocaleString(`en-US`):`N/A`,s=t.capitals?.[0]?.name||`N/A`,c=t.currencies?.map(e=>e.name).join(`, `)||`N/A`,l=t.languages?.map(e=>e.name).join(`, `)||`N/A`,u=`<p><strong>Border Countries:</strong> None</p>`;t.borders&&t.borders.length>0&&(u=`
            <div class="border-countries">
                <strong>Border Countries:</strong>
                <div class="borders-list">
                    ${t.borders.map(e=>{let t=e.toLowerCase().trim(),r=n.find(e=>{let n=e.codes?.alpha_3?.toLowerCase().trim(),r=(e.uuid||e.id)?.toLowerCase().trim(),i=e.names?.common?.toLowerCase().trim();return n===t||r===t||i===t})?.names?.common||e;return`<a href="detail.html?code=${encodeURIComponent(e)}" class="border-btn">${r}</a>`}).join(``)}
                </div>
            </div>
        `),e.innerHTML=`
        <div class="detail-flag">
            <img src="${r}" alt="${i} flag">
        </div>
        <div class="detail-info">
            <h2>${i}</h2>
            <div class="info-grid">
                <p><strong>Official Name:</strong> ${a}</p>
                <p><strong>Population:</strong> ${o}</p>
                <p><strong>Region:</strong> ${t.region||`N/A`}</p>
                <p><strong>Sub Region:</strong> ${t.subregion||`N/A`}</p>
                <p><strong>Capital:</strong> ${s}</p>
                <p><strong>Currencies:</strong> ${c}</p>
                <p><strong>Languages:</strong> ${l}</p>
            </div>
            ${u}
        </div>
    `}t?.addEventListener(`click`,()=>{window.location.href=`index.html`}),localStorage.getItem(`theme`)===`dark`&&document.body.classList.add(`dark-theme`),n?.addEventListener(`click`,()=>{document.body.classList.toggle(`dark-theme`);let e=document.body.classList.contains(`dark-theme`);localStorage.setItem(`theme`,e?`dark`:`light`)}),i();