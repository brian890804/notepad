import colorPalette from './colorPalette';

export const colorColumn = colorPalette().gradientColumn.reverse();
export const colorPie = colorPalette().gradientCircle.reverse();

export const round = (number, scale = 2) => {
	if (typeof number !== 'number') {
		throw new TypeError('The "number" argument must be of type number.');
	}

	return +`${Math.round(`${number}e+${scale}`)}e-${scale}`;
};

export const tooltipFormatter = (resource, chartType, calculateBaseText, tooltip) => {
	const { point, series, color } = tooltip;

	let content = `<span style='color:${color}'>\u25CF</span> <strong>${point.name}</strong><br />
                   <span>${calculateBaseText}</span><br/><br/> \
                   <span>總計：${point.y} tCO2e</span><br/> \
                   <span>百分比：${point.percent}%</span><br/>`;

	if (chartType === 'column') {
		const stackName = series.userOptions.stack;
		const site = resource[point.x].siteList.find(s => s.name === stackName);
		const colors = colorColumn.slice(0, site.childList.length);

		const childContent = site?.childList?.map(
			(c, idx) =>
				`<span style='color:${colors[idx]}'>\u25CF</span> \
                 <strong>${c.name}：${round(c.value, 4)}</strong> \
                 ${idx !== site.childList.length - 1 ? '<br/>' : ''}`
		);

		content = `<strong style='font-size:14px;font-weight:700;color:#0087dc'> \
                   ${tooltip.x} (${stackName})：${round(point.stackTotal, 4)}</strong><br/> \
                   <span>${calculateBaseText}</span><br/><br/> \
                   ${childContent.join(' ')}`;
	}

	return `<div class='siteComparison__body__chart__tooltip'>${content}</div>`;
};

export const generateSeries = (resource, chartType) => {
	if (resource) {
		if (chartType === 'column') {
			const stackedSeries = [];
			const { siteList } = resource[0];

			siteList?.forEach((site, index) => {
				const siteAnnual = resource.map(data => data.siteList.find(s => s.name === site?.name));
				site.childList?.forEach(child => {
					const data = {
						name: child.name,
						data: siteAnnual.map(s => s.childList.find(c => c.name === child.name)?.value),
						stack: site.name,
					};

					if (index === 0) {
						stackedSeries.push({ ...data, id: child.name });
					} else {
						stackedSeries.push({ ...data, linkedTo: child.name });
					}
				});
			});

			return stackedSeries;
		}

		const pieSeries = [];
		const siteList = resource;
		const totalValue = siteList?.reduce((pre, cur) => {
			if (cur?.value >= 0) return pre + (cur?.value || 0);
			return pre;
		}, 0);

		const insideCircle = {
			id: 'inside',
			name: 'Inside',
			size: '40%',
			dataLabels: {
				color: '#ffffff',
				distance: '-40%',
			},
			data: siteList?.map((d, idx) => ({
				name: d.name,
				y: round(d.value, 4),
				percent: round((d.value / totalValue) * 100), // 計算內層總體百分比
				color: colorPie[idx % 10],
			})),
		};

		pieSeries.push(insideCircle);

		const scopeData = [];
		const lighColors = insideCircle.data.map(i => `${i.color}AA`);
		siteList?.forEach((site, index) => {
			if (site.childList && Array.isArray(site.childList)) {
				const childList = site.childList?.filter(child => child?.value >= 0);
				scopeData.push(
					...childList?.map(d => ({
						name: d.name,
						y: round(d.value, 4),
						percent: round((d.value / totalValue) * 100), // 計算內層總體百分比
						color: lighColors[index],
						custom: {
							name: `${d.name.substr(0, 10)}...`,
						},
					}))
				);
			}
		});

		const outsideCircle = {
			id: 'outside',
			name: 'Outside',
			size: '80%',
			innerSize: '55%',
			dataLabels: {
				format: '<strong>{point.name}：</strong><span style="opacity: 0.7">{point.percent}%</span>',
				filter: {
					property: 'percentage',
					operator: '>',
					value: 0,
				},
			},
			data: scopeData,
		};

		pieSeries.push(outsideCircle);

		return pieSeries;
	}

	return [];
};
