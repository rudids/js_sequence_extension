// Saves options to chrome.storage
function save_options() {
  var theme = document.getElementById('theme').value;
  chrome.storage.sync.set({
    theme: theme
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value theme = 'hand'
  chrome.storage.sync.get({
    theme: 'hand'
  }, function(items) {
    document.getElementById('theme').value = items.theme;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
