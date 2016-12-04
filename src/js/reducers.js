import definitions from './definitions';

const round = (float)  => {
	return Math.round(float * 100) / 100;
}

export const currencies = (state = {
	isFetching: false,
	base: '',
	updated: +new Date,
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

	var newState = {};
	switch(action.type) {
		case 'UPDATE_CURRENCIES':
			let newCurrencies = Object.assign({}, state, action.data);
			return newCurrencies;

		case 'REQUEST_CURRENCIES':
			return Object.assign({}, state, {
				isFetching: true
			})

		case 'RECIEVE_CURRENCIES':
			newState = Object.assign({}, state,
				action.data, {
				isFetching: false
			})
			localStorage.setItem('state', JSON.stringify(newState));
			return newState;

		case 'RECIEVE_RAW_CURRENCIES':
			newState = Object.assign({}, state,
				transformExchangeJson(action.data, definitions), {
				isFetching: false
			})
			localStorage.setItem('state', JSON.stringify(newState));
			return newState;

		case 'REQUEST_UPDATE_QUOTES':
			return Object.assign({}, state, {
				isFetching: true
			})

		case 'RECIEVE_UPDATE_QUOTES':
			newState = Object.assign({}, state,
				transformExchangeJson(action.data, definitions), {
				isFetching: false
			})
			localStorage.setItem('state', JSON.stringify(newState));
			return newState;

		case 'HANDLE_CHANGE':
			let activeSymbol = action.data.symbol;
			let activeValue = action.data.value || '';
			let activeQuote = state.items.find(item => item.symbol == activeSymbol).quote;

			newState = Object.assign({}, state, {
				items: state.items.map(entry => {
					var value = entry.symbol == activeSymbol
						? activeValue
						: round((activeValue / activeQuote) * entry.quote);
					if (value == 0) {
						value = ''
					}

					var newEntry = Object.assign({}, entry, {
						value: value
					});

					return newEntry
				})
			})

			return newState;

		case 'TOGGLE_CURRENCY':
			let isChecked = action.event.target.checked;
			newState = Object.assign({}, state, {
				items: state.items.map(item => ({
					title: item.title,
					symbol: item.symbol,
					quote: item.quote,
					value: item.value,
					isVisible: (action.data.symbol === item.symbol) ? isChecked : item.isVisible,
				}))
			});
			localStorage.setItem('state', JSON.stringify(newState));
			return newState;

		default:
			return state || {};
	}
}

// Transform the Exchange API JSON into something we can use
function transformExchangeJson(json, definitions) {
	var newData = {}
	var localData = JSON.parse(localStorage.getItem('state'));

	newData.updated = json.timestamp,
	newData.base = json.source,
	newData.items = []

	for ( var quote in json.quotes) {
		var newSymbol = quote.replace(json.source, '');
		if (localData) {
			let matchingLocalItem =  localData.items.find(item => item.symbol === newSymbol);
			var isVisible = matchingLocalItem ? matchingLocalItem.isVisible : false;
		}
		newData.items.push({
			title: definitions[newSymbol],
			symbol: newSymbol,
			quote: json.quotes[quote],
			isVisible: isVisible || false,
		});
	}

	return newData;
}
