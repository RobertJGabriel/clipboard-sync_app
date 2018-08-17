let randomId = '_' + Math.random().toString(36).substr(2, 9);

/**
 * @param  {} info
 * @param  {} tab
 */
function save(info) {
  let selectedText = info.selectionText.trim();

  if (selectedText.length === 0) {
    return;
  }

  // Save to the master tree
  chrome.storage.sync.get('stored', item => {
    item.stored += `${selectedText}\n`;
    chrome.storage.sync.set({
      'stored': item.stored
    }, () => true)
  });

}


chrome.storage.onChanged.addListener(function(changes, namespace) {
  popup();
});


function popup() {

  const opt = {
    type: 'basic',
    title: 'New Data Synced',
    message: `New Data Synced`,
    iconUrl: chrome.runtime.getURL('images/icon-128.png'),
    requireInteraction: false
  };
  chrome.notifications.create('New Data Synced', opt);
}

chrome.contextMenus.create({
  title: 'Sync',
  contexts: ['selection'],
  onclick: save
});