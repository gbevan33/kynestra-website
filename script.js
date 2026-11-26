'use strict';

const grid = document.getElementById('products');
const select = document.getElementById('interest');
const form = document.getElementById('inquiry');
const formStatus = document.getElementById('form-status');
const catalogStatus = document.getElementById('catalog-status');
const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2
});

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function selectProduct(product) {
  select.value = product.id;
  const message = document.getElementById('message');
  if (!message.value.trim()) {
    message.value = `I would like availability and ordering information for ${product.name} ${product.strength} (${product.id}).`;
  }
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  window.setTimeout(() => message.focus(), 500);
}

function renderProduct(product) {
  const card = element('article', 'item');
  const art = element('div', 'art');
  const label = element('a', 'label-link');
  label.href = product.labelSvg;
  label.target = '_blank';
  label.rel = 'noopener noreferrer';
  label.setAttribute('aria-label', `Open full label for ${product.name} ${product.strength}`);

  const image = document.createElement('img');
  image.src = product.productImage || product.labelSvg;
  image.alt = `${product.name} ${product.strength} Kynestra label`;
  image.loading = 'lazy';
  image.decoding = 'async';

  if (image.getAttribute('src') === product.labelSvg) {
    const vial = element('div', 'vial-mockup');
    const cap = element('span', 'vial-cap');
    const glass = element('span', 'vial-glass');
    glass.append(image);
    vial.append(cap, glass);
    label.append(vial);
    art.append(label, element('span', 'art-caption', 'Vial mockup · View label'));
  } else {
    label.append(image);
    art.append(label, element('span', 'art-caption', 'View label'));
  }

  const details = element('div', 'details');
  const header = element('div', 'product-header');
  const heading = element('h3', '', `${product.name} ${product.strength}`);
  const price = element('p', 'price', Number.isFinite(product.priceUsd) ? money.format(product.priceUsd) : 'Pricing by inquiry');
  header.append(heading, price);

  const code = element('p', 'product-code', product.id);
  const description = element('p', 'description', product.catalogDescription);
  const status = element(
    'span',
    `status ${product.inventoryLotMatched ? 'matched' : 'pending'}`,
    product.inventoryLotMatched ? 'Inventory lot matched' : 'Documentation review pending'
  );

  const documentation = element('div', 'documentation');
  const coaLink = document.createElement('a');
  coaLink.href = product.coaUrl;
  coaLink.target = '_blank';
  coaLink.rel = 'noopener noreferrer';
  coaLink.textContent = product.coaLinkType.includes('portal') ? 'Open verification portal' : 'View supplied COA source';
  documentation.append(coaLink);
  if (product.coaLookupCode) documentation.append(element('span', 'lookup-code', `Lookup code: ${product.coaLookupCode}`));

  const actions = element('div', 'card-actions');
  const inquire = element('button', 'button secondary', 'Request information');
  inquire.type = 'button';
  inquire.addEventListener('click', () => selectProduct(product));
  actions.append(inquire);

  details.append(header, code, description, status, documentation, actions);
  card.append(art, details);
  return card;
}

async function loadCatalog() {
  try {
    const response = await fetch('./website-assets/registry.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Catalog request failed (${response.status})`);
    const registry = await response.json();
    const products = registry.products.filter(product => product.catalogVisible === true);

    grid.textContent = '';
    select.length = 1;
    for (const product of products) {
      grid.append(renderProduct(product));
      const option = document.createElement('option');
      option.value = product.id;
      option.textContent = `${product.name} ${product.strength} (${product.id})`;
      select.append(option);
    }
    catalogStatus.textContent = products.length
      ? `${products.length} research products listed. Availability and documentation status are shown on each item.`
      : 'No products are currently listed.';
  } catch (error) {
    console.error(error);
    grid.textContent = '';
    grid.append(element('p', 'catalog-error', 'The catalog could not be loaded. Please contact Kynestra for current availability.'));
    catalogStatus.textContent = 'Catalog temporarily unavailable.';
  }
}

function buildInquiry() {
  const selected = select.options[select.selectedIndex];
  return {
    name: document.getElementById('person').value.trim(),
    email: document.getElementById('reply').value.trim(),
    productId: select.value,
    product: selected?.textContent || 'General inquiry',
    message: document.getElementById('message').value.trim()
  };
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  const inquiry = buildInquiry();
  const endpoint = form.dataset.endpoint?.trim();
  const submitButton = form.querySelector('button[type="submit"]');
  formStatus.textContent = '';

  if (endpoint) {
    submitButton.disabled = true;
    formStatus.textContent = 'Sending inquiry…';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry)
      });
      if (!response.ok) throw new Error(`Submission failed (${response.status})`);
      form.reset();
      formStatus.textContent = 'Your inquiry was sent. Kynestra will follow up by email.';
      return;
    } catch (error) {
      console.error(error);
      formStatus.textContent = 'Online delivery is unavailable. Opening an email draft instead.';
    } finally {
      submitButton.disabled = false;
    }
  }

  const subject = `Kynestra research inquiry${inquiry.productId ? ` - ${inquiry.productId}` : ''}`;
  const body = [`Name: ${inquiry.name}`, `Reply email: ${inquiry.email}`, `Product: ${inquiry.product}`, '', inquiry.message].join('\n');
  window.location.href = `mailto:kynestrabio@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.getElementById('year').textContent = new Date().getFullYear();
loadCatalog();
