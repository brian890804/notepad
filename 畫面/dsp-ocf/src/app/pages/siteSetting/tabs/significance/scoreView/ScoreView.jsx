import React from 'react';
import PropTypes from 'prop-types';

export const severityScore = 3.5;
export const scoringFormula = ({ difficulty = 0, accuracy = 0, collectTime = 0, necessary = 0 }) =>
	Math.round((difficulty * 0.2 + accuracy * 0.3 + collectTime * 0.5 + necessary) * 100) / 100;

const getScore = (mapping, key, value) => mapping?.[key]?.find(i => i?.value === value)?.score || 0;

const ScoreView = ({ type, value, socreMapping }) => {
	const { difficulty, accuracy, collectTime, necessary } = value || {};

	const totalScore = scoringFormula({
		difficulty: getScore(socreMapping, 'difficulty', difficulty?.value),
		accuracy: getScore(socreMapping, 'accuracy', accuracy?.value),
		collectTime: getScore(socreMapping, 'collectTime', collectTime?.value),
		necessary: getScore(socreMapping, 'necessary', necessary?.value),
	});

	if (type === 'scoreMode') return totalScore;
	if (type === 'S/NSMode') {
		if (totalScore > severityScore) return <div style={{ color: '#d63333', fontWeight: 'bold' }}>S</div>;
		return 'NS';
	}
	return 'ScoreView not mapping';
};

ScoreView.defaultProps = {
	type: 'scoreMode',
	value: undefined,
	socreMapping: undefined,
};

ScoreView.propTypes = {
	type: PropTypes.oneOf(['scoreMode', 'S/NSMode']),
	value: PropTypes.shape({
		difficulty: PropTypes.shape({
			key: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
			label: PropTypes.string,
			value: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
		}),
		accuracy: PropTypes.shape({
			key: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
			label: PropTypes.string,
			value: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
		}),
		collectTime: PropTypes.shape({
			key: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
			label: PropTypes.string,
			value: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
		}),
		necessary: PropTypes.shape({
			key: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
			label: PropTypes.string,
			value: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
		}),
	}),
	socreMapping: PropTypes.shape({
		difficulty: PropTypes.arrayOf(
			PropTypes.shape({
				score: PropTypes.number,
				label: PropTypes.string,
				value: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
			})
		),
		accuracy: PropTypes.arrayOf(
			PropTypes.shape({
				score: PropTypes.number,
				label: PropTypes.string,
				value: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
			})
		),
		collectTime: PropTypes.arrayOf(
			PropTypes.shape({
				score: PropTypes.number,
				label: PropTypes.string,
				value: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
			})
		),
		necessary: PropTypes.arrayOf(
			PropTypes.shape({
				score: PropTypes.number,
				label: PropTypes.string,
				value: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
			})
		),
	}),
};

export default ScoreView;
