(function () {
  const form = document.getElementById('itemForm');
  const nameField = document.getElementById('itemName');
  const editField = document.getElementById('editingId');
  const saveButton = document.getElementById('saveBtn');

  if (!form || !nameField || !editField) return;

  function findExistingItem() {
    if (editField.value) return;

    const name = nameField.value.trim().toLowerCase();
    if (!name) return;

    const matches = data.filter(item =>
      String(item.name).trim().toLowerCase() === name
    );

    if (matches.length !== 1) return;

    const existing = matches[0];
    editField.value = existing.id;

    document.getElementById('itemNotes').value =
      existing.notes || '';

    photoData = existing.photo || '';
    saveButton.textContent = 'Update this spot';
  }

  form.addEventListener('submit', findExistingItem, true);
})();