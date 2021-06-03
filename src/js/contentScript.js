// Loads contentMain.js, which loads the rest of the module.
(async () => {
    const src = chrome.runtime.getURL('./contentMain.js');
    const contentScript = await import(src);
    contentScript.main();
})();