import { expect, describe, test } from 'vitest';

describe('worker-stripe', () => {
	describe('When checking if the worker is running', () => {
		test('Then it should be running', async () => {
			const response = await fetch('http://localhost:8787', { method: 'HEAD' });

			expect(response.status).to.equal(200);
		});
	});

	describe('When calling the worker', () => {
		test('Then it should return an error', async () => {
			const response = await fetch('http://localhost:8787', { method: 'GET' });

			expect(response.status).to.equal(500);
		});
	});
});
