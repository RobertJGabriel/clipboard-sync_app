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

chrome.contextMenus.create({
  title: 'Snip',
  contexts: ['selection'],
  onclick: save
});