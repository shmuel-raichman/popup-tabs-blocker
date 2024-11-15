// B"H

document.addEventListener('DOMContentLoaded', () => {
    const blockedSitesList = document.getElementById('blocked-sites');
    const newSiteInput = document.getElementById('new-site');
    const addSiteButton = document.getElementById('add-site');

    // Load blocked sites from local storage
    chrome.storage.local.get('blockedDomains', (data) => {
        const blockedDomains = data.blockedDomains || [];
        blockedDomains.forEach(domain => {
            addSiteToList(domain);
        });
    });

    // Add site to the list
    addSiteButton.addEventListener('click', () => {
        const newSite = newSiteInput.value.trim();
        if (newSite) {
            chrome.storage.local.get('blockedDomains', (data) => {
                const blockedDomains = data.blockedDomains || [];
                blockedDomains.push(newSite);
                chrome.storage.local.set({ blockedDomains });
                addSiteToList(newSite);
                updatePermissions(newSite);
                newSiteInput.value = '';
            });
        }
    });

    function addSiteToList(site) {
        const li = document.createElement('li');
        li.textContent = site;
        blockedSitesList.appendChild(li);
    }

    function updatePermissions(site) {
        chrome.permissions.request({
            origins: [`*://${site}/*`]
        }, (granted) => {
            if (granted) {
                console.log(`Permission granted for ${site}`);
            } else {
                console.log(`Permission denied for ${site}`);
            }
        });
    }
});