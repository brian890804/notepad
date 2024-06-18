import React from 'react';
// import PropTypes from 'prop-types';
import { DSPWelcome } from '@delta/dsp-ui';

import './welcome.scss';

const Welcome = () => (
	<DSPWelcome
		className="welcome"
		title="Greenhouse Gas Inventory System"
		description={
			<>
				Realizing an <strong>Intelligent</strong>, <strong>Sustainable</strong> and <strong>Connecting</strong> World
			</>
		}
	/>
);

Welcome.propTypes = {};

export default Welcome;
