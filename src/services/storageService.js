
function store(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function remove(key) {
    localStorage.removeItem(key)
}

function load(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}
export const storageService = {
    store,
    load,
    remove
}
