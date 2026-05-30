(function () {
  const endpoint = '/api/leads';

  function field(form, name) {
    const el = form && form.elements ? form.elements[name] : null;
    return el ? el.value.trim() : '';
  }

  async function submitLead(form, extras) {
    const payload = Object.assign({
      type: form ? form.dataset.leadType || 'contact' : 'contact',
      source: window.location.pathname,
      firstName: field(form, 'firstName'),
      lastName: field(form, 'lastName'),
      email: field(form, 'email'),
      company: field(form, 'company'),
      country: field(form, 'country'),
      message: field(form, 'message'),
      website: field(form, 'website'),
      consent: Boolean(form && form.elements && form.elements.consent && form.elements.consent.checked),
    }, extras || {});

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.ok) {
      throw new Error(result.error || 'Unable to submit right now. Please email hello@productivemachines.co.uk.');
    }
    return result;
  }

  window.PM = Object.assign(window.PM || {}, { submitLead });
})();
