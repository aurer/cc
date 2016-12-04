import 'whatwg-fetch';

const exchangeEndpoint = 'http://apilayer.net/api/live?access_key=3ee63dc026b36372bcf91cd099eedca4';
const urlRoot = window.location.protocol + '//' + window.location.hostname + ':3333';

export const handleChange = (data) => ({type: 'HANDLE_CHANGE', data });

// Fetch curremcies from the API
export const fetchCurrencies = () => {
  return dispatch => {
 		dispatch(requestCurrencies());
 		let localData = JSON.parse(localStorage.getItem('state'));
 		if (localData) {
 			dispatch(recieveCurrencies(localData))
 		} else {
	 		fetch(exchangeEndpoint)
				.then(res => res.json())
				.then(json => dispatch(recieveRawCurrencies(json)))
				.catch(e => { console.error('Error when fetching currencies', e) });
 		}
 	}
}
export const requestCurrencies = () => ({type: 'REQUEST_CURRENCIES' });
export const recieveCurrencies = (currencies) => ({type: 'RECIEVE_CURRENCIES', data: currencies });
export const recieveRawCurrencies = (currencies) => ({type: 'RECIEVE_RAW_CURRENCIES', data: currencies });

// Toggle a currency as active or inactive
export const toggleCurrency = (json, e) => ({type: 'TOGGLE_CURRENCY', data: json, event: e});

// Update quotes on the server
export const updateQuotes = () => {
	return dispatch => {
 		dispatch(requestUpdateQuotes());

 		fetch(exchangeEndpoint)
				.then(res => res.json())
				.then(json => dispatch(recieveUpdateQuotes(json)))
				.catch(e => { console.error('Error when fetching update currencies', e) });
 	}
}
export const requestUpdateQuotes = () => ({type: 'REQUEST_UPDATE_QUOTES'});
export const recieveUpdateQuotes = (json) => ({type: 'RECIEVE_UPDATE_QUOTES', data: json});

