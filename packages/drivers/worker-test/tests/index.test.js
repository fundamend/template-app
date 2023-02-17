import { expect, describe, test } from 'vitest';

describe('worker-stripe', () => {
	describe('When checking if the worker is running', () => {
		test('Then it should be running', async () => {
			const response = await fetch('http://localhost:8787', { method: 'HEAD' });

			expect(response.status).to.equal(200);
		});
	});

	describe('When calling the worker', () => {
		test('Then it should return a response', async () => {
			const body = { test: 123 };
			const response = await fetch('http://localhost:8787', {
				method: 'POST',
				body: JSON.stringify(body)
			});

			expect(response.status).to.equal(200);
			expect(await response.json()).toEqual(body);
		});
	});
});
