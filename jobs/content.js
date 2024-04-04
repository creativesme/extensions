chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

    if(request.message == 'startscraping'){
        console.log('in scrapping mode');
        let jobTitle = company = location = '';
        const listItems = document.querySelectorAll('div.base-search-card__info');
    
        for (let i = 0; i < listItems.length; i++) {
            jobTitle = (listItems[i].querySelector('h3').textContent).trim();
            company = (listItems[i].querySelector('h4 a').textContent).trim();
            location  = (listItems[i].querySelector('div.base-search-card__metadata span.job-search-card__location').textContent).trim()

            chrome.storage.sync.get(['items'], function(result) {
                let items = result.items
                items += jobTitle+','+company+','+location+'\n'
                chrome.storage.sync.set({'items': items});
            });
        }
    }

    if(request.message == 'downloadscraping') {
        chrome.storage.sync.get(['items'], function(result) {
            csv = result.items;
            let hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'scrapData.csv';
            hiddenElement.click();
        });
    }
})

