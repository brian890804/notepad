import randomContent from '../utils/randomContent';
import randomNumber from '../utils/randomNumber';
import randomTime from '../utils/randomTime';

export default () =>
	[
		{
			name: '柴油',
			description: '超級柴油好柴好柴',
			number: 100,
			unit: '公升',
			startTime: 1683492971556,
			endTime: 1683492971556,
			modifyDate: 1683492971556,
			attachment: [
				{
					fileId: '1',
					ext: 'pdf',
					title: '柴油發票',
					name: '柴油發票',
					createTime: 1683492971556,
					modifyDate: 1683492971556,
					downloadUrl: 'https://www.google.com',
					author: { label: 'HSUN.TSAI', value: 'ABCD' },
				},
			],
			privilege: { read: false, edit: true, delete: true },
		},
		{
			name: '乙烷Ethane',
			unit: '公升',
			privilege: { read: true, edit: true, delete: true },
		},
		{
			name: '奧里油Orimulsion',
			unit: '公升',
			privilege: { read: true, edit: false, delete: false },
		},
		{
			name: '乙烷Ethane',
			unit: '公升',
			privilege: { read: false, edit: true, delete: true },
		},
		{ name: '木頭－固態Wood/Wood Waste', unit: '公斤', privilege: { read: true, edit: true, delete: false } },
		{ name: '掩埋場沼氣Landfill Gas', unit: '公升', privilege: { read: false, edit: true, delete: true } },
		{
			name: 'CO2滅火器-CO2 fire extinguishers',
			unit: '公升',
			privilege: { read: false, edit: true, delete: false },
		},
	].map((item, i) => {
		const startTime = randomTime();
		const attachments = Array(randomNumber(0, 5))
			.fill()
			.map((_, j) => {
				const createTime = randomTime();
				const ext = randomContent(['pdf', 'docx', 'jpg', 'xlsx', 'ppt']);
				return {
					fileId: j.toString(),
					ext,
					title: `${item?.name}發票.${ext}`,
					name: `${item?.name}發票.${ext}`,
					createTime,
					modifyDate: randomTime(createTime),
					downloadUrl: 'https://www.google.com',
					author: { label: 'HSUN.TSAI', value: 'ABCD' },
				};
			});
		return {
			...item,
			id: i,
			startTime,
			number: randomNumber(0, 500),
			endTime: randomTime(startTime, startTime + 5184000),
			modifyDate: randomTime(),
			attachments,
		};
	});
