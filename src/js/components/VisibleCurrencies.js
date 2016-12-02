import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { updateQuotes, handleChange } from '../actions'
import TableRow from './TableRow'

let mapStateToProps = ({currencies}) => {
	let visibleCurrencies = currencies.items.filter(c => c.isVisible === true);
	return {currencies: visibleCurrencies}
}

let mapDispatchToProps = dispatch => ({
	updateQuotes: () => dispatch(updateQuotes())
})

const VisibleCurrencies = React.createClass ({
	render() {
		let currencies = this.props.currencies;
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
				</div>
			</section>
		)
	},

	onClickUpdateQuotes() {
		this.props.updateQuotes()
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(VisibleCurrencies);
