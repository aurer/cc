import React from 'react'
import { connect } from 'react-redux'
import { handleChange } from '../actions'

let mapStateToProps = ({currencies}) => ({
	currencies
});

let mapDispatchToProps = dispatch => ({
	handleChange: e => dispatch(handleChange(e))
})

const TableRow = React.createClass ({
	render() {
		let currencies = this.props.currencies;
		return (
			<tr className="VisibleCurrency">
				<td className="VisibleCurrency-field"><input type="number" value={this.props.quote.value} ref={this.props.quote.symbol} onChange={this.onChange} /></td>
				<th className="VisibleCurrency-symbol">{this.props.quote.symbol}</th>
			</tr>
		)
	},

	onChange(e) {
		let symbol = Object.keys(this.refs)[0];
		let	value = e.target.value;
		this.props.handleChange({symbol, value});
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(TableRow);
