export default ({ resource, title }) => {
	const chart = {
		type: 'pie',
		style: {
			fontWeight: '600', // 將標題文字設置為粗體
		},
	};
	const plotOptions = {
		series: {
			allowPointSelect: true,
			cursor: 'pointer',
			dataLabels: [
				{
					enabled: true,
					distance: 20,
				},
				{
					enabled: true,
					distance: -40,
					format: '{point.percentage:.1f}%',
					style: {
						fontSize: '1.2em',
						textOutline: 'none',
						opacity: 0.7,
					},
					filter: {
						operator: '>',
						property: 'percentage',
						value: 10,
					},
				},
			],
		},
	};

	const series = (() => {
		if (resource) {
			return [{ data: resource }];
		}
		return [{ data: [0, 0] }];
	})();

	const chartTitle = {
		text: title,
		verticalAlign: 'top',
		align: 'center',
		margin: 30,
		useHTML: true,
		widthAdjust: -(window.innerWidth / 6),
		style: {
			fontSize: '24px',
			fontWeight: 'bold',
			color: '#0087DC',
		},
	};

	const accessibility = {
		enabled: false,
	};
	return {
		chartProps: { chart, series, accessibility, title: chartTitle, plotOptions },
	};
};
