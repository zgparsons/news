const apiKey = '95041184a82f4979b53aef73581b9582';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'independent';

window.addEventListener('load', async e => {
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSource;

    sourceSelector.addEventListener('change', e => {
        updateNews(e.target.value);
    });

    if('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('sw.js');
            console.log('sw registered');
        } catch (error) {
            console.log('registration failed...');
        }
    };
})

async function updateSources() {
    const res = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`)
    const json = await res.json();

    sourceSelector.innerHTML = json.sources
      .map(src => `<option value="${src.id}">${src.name}</option>`)
      .join('\n');
}

async function updateNews(source = defaultSource) {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`);
    const json = await res.json();

    main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article){
    return `
        <div class="article">
            <a href="${article.url}" target="_blank">
                <h2>${article.title}</h2>
                <img src="${article.urlToImage}">
                <p>${article.description}</p>
            </a>
        </div>
    `;
}