const { test: base } = require('@playwright/test');

const TestOptions = {
    globalQaURL: ''
};

const test = base.extend({
    globalQaURL: ['', { option: true }]
});
