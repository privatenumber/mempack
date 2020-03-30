const { default: mempack } = require('esm')(module)('../lib');
const outdent = require('outdent');

describe('Basic build', () => {
	test('Import JS', async () => {
		const built = await mempack({
			files: [
				{
					name: 'index.js',
					content: outdent`
					import A from './A.js';
					console.log(A);
					`,
				},
				{
					name: 'A.js',
					content: outdent`
					export default 'Hello World'
					`,
				},
			],
		});
		expect(typeof built).toBe('string');
		expect(built.length).toBeGreaterThan(1);
	});

	test('Import CSS', async () => {
		const built = await mempack({
			files: [
				{
					name: 'index.js',
					content: outdent`
					import A from './A.css';
					console.log(A);
					`,
				},
				{
					name: 'A.css',
					content: outdent`
					.class {
						color: red;
					}
					`,
				},
			],
		});

		expect(typeof built).toBe('string');
		expect(built.length).toBeGreaterThan(1);
	});

	test('Import Vue', async () => {
		const built = await mempack({
			files: [
				{
					name: 'index.js',
					content: outdent`
					import Vue from 'vue';
					import App from './App.vue';

					new Vue({
						el: '#app',
						render: h => h(App),
					});
					`,
				},
				{
					name: 'App.vue',
					content: outdent`
					<template>
						<div>Hello world</div>
					</template>
					`,
				},
			],
		});

		expect(typeof built).toBe('string');
		expect(built.length).toBeGreaterThan(1);
	});

	test('Import MD as Vue', async () => {
		const built = await mempack({
			files: [
				{
					name: 'index.js',
					content: outdent`
					import Vue from 'vue';
					import Doc from './Doc.md';

					new Vue({
						el: '#app',
						render: h => h(Doc),
					});
					`,
				},
				{
					name: 'Doc.md',
					content: outdent`
					## Doc Heading
					Doc content
					`,
				},
			],
		});

		expect(typeof built).toBe('string');
		expect(built.length).toBeGreaterThan(1);
	});
});
