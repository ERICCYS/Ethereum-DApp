const address = '0x96515ffc20272dfec358602eca1177c52f2d5970'
const ABI = [
	{
		constant: false,
		inputs: [
			{
				name: 'amount',
				type: 'uint256'
			}
		],
		name: 'deposit',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'constructor'
	},
	{
		constant: false,
		inputs: [
			{
				name: 'amount',
				type: 'uint256'
			}
		],
		name: 'withdraw',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		constant: true,
		inputs: [],
		name: 'balance',
		outputs: [
			{
				name: '',
				type: 'uint256'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	}
]

export {address,ABI}
