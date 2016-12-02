import 'whatwg-fetch';

export const requestCurrencies = () => ({type: 'REQUEST_POSTS' });
export const recieveCurrencies = (currencies) => ({type: 'RECIEVE_CURRENCIES', data: currencies });
export const handleChange = (data) => ({type: 'HANDLE_CHANGE', data });

const urlRoot = window.location.protocol + '//' + window.location.hostname + ':3333';

export const fetchCurrencies = () => {
  return dispatch => {
 		dispatch(requestCurrencies());

 		fetch(`${urlRoot}/api/data`)
			.then(res => res.json())
			.then(json => dispatch(recieveCurrencies(json)))
			.catch(e => { console.error(e) });
 	}
}

export const updateQuotes = () => {
	return dispatch => {
 		dispatch(requestUpdateQuotes());

 		fetch(`${urlRoot}/api/data/update-quotes`)
			.then(res => res.json())
			.then(json => dispatch(recieveUpdateQuotes(json)))
			.catch(e => { console.error(e) });
 	}
}
export const requestUpdateQuotes = () => ({type: 'REQUEST_UPDATE_QUOTES'});
export const recieveUpdateQuotes = (json) => ({type: 'RECIEVE_UPDATE_QUOTES', data: json});

export const toggleCurrency = (currency, event) => {
	currency.isVisible = event.target.checked;
	return dispatch => {
 		dispatch(requestToggleCurrency());

 		fetch(`${urlRoot}/api/data/toggle-currency`, {
 			method: 'POST',
 			headers: {'Content-Type': 'application/json'},
 			body: JSON.stringify(currency)
 		})
			.then(res => res.json())
			.then(json => dispatch(recieveToggleCurrency(json)))
			.catch(e => { console.error(e) });
 	}
}
export const requestToggleCurrency = () => ({type: 'REQUEST_TOGGLE_CURRENCY'});
export const recieveToggleCurrency = (json) => ({type: 'RECIEVE_TOGGLE_CURRENCY', data: json});
