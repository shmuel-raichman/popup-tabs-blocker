// B"H


chrome.storage.local.get('blockedDomains', (data) => {
    const blockedDomains = data.blockedDomains;

    chrome.webNavigation.onCreatedNavigationTarget.addListener((details) => {
        chrome.tabs.get(details.sourceTabId, (tab) => {
            if (tab) {
                const originatingDomain = blockedDomains.find(domain => tab.url.includes(domain));
                if (originatingDomain) {
                    chrome.tabs.remove(details.tabId); // Close the pop-up tab
                    console.log("Blocked pop-up from: ", details.url);
                }
            }
        });
    });
});