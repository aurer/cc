const round = (float)  => {
	return Math.round(float * 100) / 100;
}

export const currencies = (state = {
	isFetching: false,
	didInvalidate: false,
	base: 'USD',
	timestamp: +new Date,
	items: []
}, action) => {

	console.log(action.type);

	Object.values = function(object) {
		var values = [];
		for (var key in object) {
			values.push(object[key])
		}
		return values;
	}

	switch(action.type) {
		case 'UPDATE_CURRENCIES':
			let newCurrencies = Object.assign({}, state, action.data);
			return newCurrencies;

		case 'REQUEST_CURRENCIES':
			return Object.assign({}, state, {
				isFetching: true
			})

		case 'RECIEVE_CURRENCIES':
			return Object.assign({}, state, {
				isFetching: false,
				base: action.data.source,
				timestamp: action.data.updated,
				items: Object.values(action.data.quotes).map(entry => ({
					symbol: entry.symbol,
					quote: entry.quote,
					isVisible: entry.isVisible,
					value: ''
				}))
			})

		case 'REQUEST_UPDATE_QUOTES':
			return Object.assign({}, state, {
				isFetching: true
			})

		case 'RECIEVE_UPDATE_QUOTES':
			return Object.assign({}, state, {
				isFetching: false,
				items: Object.values(action.data.quotes).map(entry => ({
					symbol: entry.symbol,
					quote: entry.quote,
					isVisible: entry.isVisible,
					value: ''
				}))
			})

		case 'HANDLE_CHANGE':
			let activeSymbol = action.data.symbol;
			let activeValue = action.data.value || '';
			let activeQuote = Object.values(state.items).find(item => item.symbol == activeSymbol).quote;

			var newState = Object.assign({}, state, {
				items: Object.values(state.items).map(entry => {
					var value = entry.symbol == activeSymbol
						? activeValue
						: round((activeValue / activeQuote) * entry.quote);
					if (value == 0) {
						value = ''
					}

					var newEntry = {
						symbol: entry.symbol,
						quote: entry.quote,
						isVisible: entry.isVisible,
						value: value
					}
					return newEntry
				})
			})

			return newState;

		case 'REQUEST_TOGGLE_CURRENCY':
			return Object.assign({}, state, {
				isFetching: true
			})

		case 'RECIEVE_TOGGLE_CURRENCY':
			return Object.assign({}, state, {
				isFetching: false,
				items: Object.values(action.data.quotes).map(entry => ({
					symbol: entry.symbol,
					quote: entry.quote,
					isVisible: entry.isVisible,
					value: ''
				}))
			})


		case 'TOGGLE_CURRENCY':
			return Object.assign({}, state, {
				items: Object.values(state.items).map(entry => ({
					symbol: entry.symbol,
					quote: entry.quote,
					isVisible: (action.data.symbol === entry.symbol) ? true : entry.isVisible,
					value: entry.value
				}))
			});

		default:
			return state || {};
	}
}
