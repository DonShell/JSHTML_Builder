const { JSDOM } = require('jsdom');

const { window } = new JSDOM('<!DOCTYPE html><html><body></body></html>');
const document = window.document;

module.exports = document;