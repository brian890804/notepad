import { SearchOutlined } from '@delta/dsp-ui/lib/antd/icons';
import { Button, Input, Space } from '@delta/dsp-ui/lib/antd';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

export default () => {
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef(null);
	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const getColumnSearchProps = (dataIndex, searchValue) => ({
		// eslint-disable-next-line react/prop-types
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
			<div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() => {
							clearFilters();
							setSearchText('');
							close();
							confirm();
						}}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>
					<Button type="link" size="small" onClick={() => close()}>
						close
					</Button>
				</Space>
			</div>
		),
		filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
		onFilter: (value, record) => record[dataIndex]?.toString()?.toLowerCase()?.includes(value?.toLowerCase()),
		onFilterDropdownOpenChange: visible => {
			if (visible) setTimeout(() => searchInput.current?.select(), 100);
		},
		render: text => {
			if (searchedColumn === dataIndex || searchValue) {
				return (
					<Highlighter
						highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
						searchWords={[searchText, searchValue]}
						autoEscape
						textToHighlight={text ? text.toString() : ''}
					/>
				);
			}
			return text;
		},
	});

	return getColumnSearchProps;
};
