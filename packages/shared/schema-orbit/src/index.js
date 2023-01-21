import { RecordSchema } from '@orbit/records';

export default new RecordSchema({
	models: {
		dimension: {
			attributes: {
				name: { type: 'string ' }
			},
			relationships: {
				measures: { kind: 'hasMany', type: 'measure', inverse: 'dimension' },
				milestones: { kind: 'hasMany', type: 'milestone', inverse: 'dimension' }
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
				name: { type: 'string ' }
			},
			relationships: {
				dimension: { kind: 'hasOne', type: 'dimension', inverse: 'milestone' }
			}
		}
	}
});
