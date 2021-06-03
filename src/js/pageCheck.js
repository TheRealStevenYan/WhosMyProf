export function isSectionsPage(url) {
    let bool = new URLSearchParams(url).has("subj-section");
    return bool;
}

export function isSectionsPage(url) {
    let bool = new URLSearchParams(url).has("subj-course");
    return bool;
}