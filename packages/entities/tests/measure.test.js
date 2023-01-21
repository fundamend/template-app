import { expect, describe, test, vi } from 'vitest';
import { Measure } from '@template-app/entities';

describe('Measure', () => {
	describe('When created without parameters', () => {
		test('Then its properties should be set correctly', () => {
			const date = new Date('2000-01-01T00:00:00.000Z');
			vi.useFakeTimers();
			vi.setSystemTime(date);

			const measure = new Measure();
			expect(measure.id).to.be.undefined;
			expect(measure.timestamp).to.equal(date.toISOString());
			expect(measure.value).to.be.undefined;
			expect(measure.dimension).to.be.undefined;

			vi.useRealTimers();
		});
	});

	describe('When created with parameters', () => {
		test('Then its properties should be set correctly', () => {
			const date = new Date('2000-01-01T00:00:00.000Z');
			vi.useFakeTimers();
			vi.setSystemTime(date);

			const measure = new Measure('id');
			expect(measure.id).to.equal('id');
			expect(measure.timestamp).to.equal(date.toISOString());
			expect(measure.value).to.be.undefined;
			expect(measure.dimension).to.be.undefined;

			vi.useRealTimers();
		});
	});

	describe('When its properties are set', () => {
		test('Then its properties should be set correctly', () => {
			const date = new Date('2000-01-01T00:00:00.000Z');
			vi.useFakeTimers();
			vi.setSystemTime(date);

			const measure = new Measure('id');

			measure.id = 'id2';
			measure.timestamp = '1999-12-12T12:12:12.123Z';
			measure.value = 42;
			measure.dimension = 'dimension';

			expect(measure.id).to.equal('id2');
			expect(measure.timestamp).to.equal('1999-12-12T12:12:12.123Z');
			expect(measure.value).to.equal(42);
			expect(measure.dimension).to.equal('dimension');

			vi.useRealTimers();
		});
	});
});
