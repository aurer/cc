import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { handleChange, toggleCurrency } from '../actions'
import TableRow from './TableRow'
import fuzzysearch from 'fuzzysearch';

let mapStateToProps = ({currencies}) => {
	let visibleCurrencies = currencies.items;
	return {currencies: visibleCurrencies}
}

let mapDispatchToProps = dispatch => ({
	toggleCurrency: (currency, event) => dispatch(toggleCurrency(currency, event))
})

class EditCurrencies extends React.Component {
	constructor(props) {
		super(props);
		this.state = {filterText: ''}
		this.doFilter = this.doFilter.bind(this);
	}

	render() {
		var currencies = this.props.currencies.filter(q => fuzzysearch(this.state.filterText, q.symbol.toLowerCase()));

		return (
			<section className="Section Section--EditCurrencies">
				<div className="Section-header">
					<Link to="/" className="Button">Done</Link>
				</div>
				<div className="Section-inner">
					<form className="Form Form--filter">
						<div className="Form-field">
							<div className="Form-inputs">
								<input type="search" onChange={this.doFilter} placeholder="Filter" />
							</div>
						</div>
					</form>

					{ currencies.map((currency, i) => {
						return <div className="Currency" key={i}>
							<span className="Currency-symbol">{currency.symbol}</span>
							<span className="Currency-toggle">
								<input id={'toggle'+currency.symbol} type="checkbox" checked={currency.isVisible} onChange={e => this.props.toggleCurrency(currency, e)} />
								<label htmlFor={'toggle'+currency.symbol}></label>
							</span>
						</div>
					}) }
				</div>
			</section>
		)
	}

	doFilter(e) {
		this.setState({filterText: e.target.value.toLowerCase()});
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCurrencies);
