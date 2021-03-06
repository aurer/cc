import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { updateQuotes, handleChange } from '../actions'
import TableRow from './TableRow'

let mapStateToProps = ({currencies}) => {
	let visibleCurrencies = currencies.items.filter(c => c.isVisible === true);
	return {
		isFetching: currencies.isFetching,
		currencies: visibleCurrencies
	}
}

let mapDispatchToProps = dispatch => ({
	updateQuotes: () => dispatch(updateQuotes())
})

const VisibleCurrencies = React.createClass ({
	render() {
		let currencies = this.props.currencies;
		let loadingClassName = 'Loading ' + 'Loading--' + this.props.isFetching;
		let fallback = (<div className="noCurrenciesMessage">
				<p>You havent added any currencies yet</p>
				<p><Link className="Button" to="edit">Add some now</Link></p>
			</div>);

		return (
			<section className="Section Section--visibleCurrencies">
				<div className="Section-header">
					<Link className="Button u-left" to="/edit">Edit</Link>
					<button className="Button u-right" onClick={this.onClickUpdateQuotes}>Update quotes</button>
				</div>
				<div className="Section-inner">
					<table className="VisibleCurrencies">
						<tbody>
							{ currencies.map((quote, i) => <TableRow key={i} quote={quote} />) }
						</tbody>
					</table>
					{ !currencies.length && fallback }
				</div>
			</section>
		)
	},

	onClickUpdateQuotes() {
		this.props.updateQuotes()
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(VisibleCurrencies);
