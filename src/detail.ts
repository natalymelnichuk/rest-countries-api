
const urlParams = new URLSearchParams(window.location.search);
const countryCode = urlParams.get('code');

console.log('Selected country code', countryCode);