import React from 'react';
import { DSPFileExtIcon } from '@delta/dsp-ui';
import services from '../../../../../../../../config/services';
import './fileList.scss';

const FileList = (files, onMoreClick, limit = 4) => (
	<div className="fileList">
		{(Array.isArray(files) ? files : []).map(({ id, ext, name: title }, index) => {
			if (index < limit) {
				return <DSPFileExtIcon key={id} {...{ ext, title }} onClick={() => window.open(`${services.file}/${id}`, '_blank')} />;
			}
			return false;
		})}
		{files?.length > limit - 1 && (
			<div className="fileList__dot" onClick={onMoreClick}>
				...
			</div>
		)}
	</div>
);

export default FileList;
