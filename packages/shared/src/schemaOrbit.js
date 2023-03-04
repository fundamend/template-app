import { RecordSchema } from '@orbit/records';

export const SchemaOrbit = new RecordSchema({
	models: {
		dimension: {
			attributes: {
				name: { type: 'string ' }
			},
			relationships: {
				measures: {
					kind: 'hasMany',
					type: 'measure',
					inverse: 'dimension',
					dependent: 'remove'
				},
				milestones: {
					kind: 'hasMany',
					type: 'milestone',
					inverse: 'dimension',
					dependent: 'remove'
				}
			}
		},
		measure: {
			attributes: {
				name: { type: 'string ' }
			},
			relationships: {
				dimension: { kind: 'hasOne', type: 'dimension', inverse: 'measures' }
			}
		},
		milestone: {
			attributes: {
				threshold: { type: 'float' },
				type: { type: 'string' },
				reached: { type: 'boolean' }
			},
			relationships: {
				dimension: { kind: 'hasOne', type: 'dimension', inverse: 'milestones' }
			}
		}
	}
});
