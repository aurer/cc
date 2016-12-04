import React from 'react'
import { connect } from 'react-redux'
import { handleChange } from '../actions'

let mapDispatchToProps = dispatch => ({
	handleChange: e => dispatch(handleChange(e))
})

class TableRow extends React.Component {
	componentWillMount() {
		this.state = { isActive: false }
		this.onFocus = this.onFocus.bind(this)
		this.onBlur = this.onBlur.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	render() {
		let rowClassName = 'VisibleCurrency isActive-' + this.state.isActive;
		return (
			<tr className={rowClassName}>
				<th className="VisibleCurrency-symbol">{this.props.quote.symbol}</th>
				<td className="VisibleCurrency-field">
					<input
						type="number"
						pattern="[0-9]*"
						value={this.props.quote.value}
						ref={this.props.quote.symbol}
						onChange={this.onChange}
						onFocus={this.onFocus}
						onBlur={this.onBlur}
					/>
				</td>
			</tr>
		)
	}

	onFocus(e) {
		this.setState({isActive: true})
	}

	onBlur(e) {
		this.setState({isActive: false})
	}

	onChange(e) {
		let symbol = Object.keys(this.refs)[0];
		let	value = e.target.value;
		this.props.handleChange({symbol, value});
	}
}

export default connect(null, mapDispatchToProps)(TableRow);
