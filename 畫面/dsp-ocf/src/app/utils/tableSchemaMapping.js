import { DSPTableItem } from '@delta/dsp-ui';

const baseWidth = 100;
export default props => ({
	...props,
	width: props.width || baseWidth * (props.weight || 1),
	render: (text, record, index) => {
		if (props.render) return props.render(text, record, index);
		return DSPTableItem.StringItem(text);
	},
});
