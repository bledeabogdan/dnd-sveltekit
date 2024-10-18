export const list = [
	{ id: '1', content: 'Item 1' },
	{ id: '2', content: 'Item 2' },
	{ id: '3', content: 'Item 3' },
	{ id: '4', content: 'Item 4' },
	{ id: '5', content: 'Item 5' }
]

export const treeList = [
	{
		id: '1',
		isOpen: true,

		children: [
			{
				id: '1.3',
				isOpen: true,

				children: [
					{
						id: '1.3.1',
						children: []
					},
					{
						id: '1.3.2',
						isDraft: true,
						children: []
					}
				]
			},
			{ id: '1.4', children: [] }
		]
	},
	{
		id: '2',
		isOpen: true,
		children: [
			{
				id: '2.3',
				isOpen: true,

				children: [
					{
						id: '2.3.1',
						children: []
					},
					{
						id: '2.3.2',
						children: []
					}
				]
			}
		]
	}
]
