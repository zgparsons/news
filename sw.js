const staticAssets = [
    './',
    './styles.css',
    './app.js'
];

self.addEventListener('install', event => {
    console.log('install');
})

self.addEventListener('fetch', event => {
    console.log('fetch');
})