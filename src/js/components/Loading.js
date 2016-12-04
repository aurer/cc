import React from 'react'
import { connect } from 'react-redux'

let mapStateToProps = ({currencies}) => ({
	currencies
})

class Loading extends React.Component {
	render() {
		let containerClassName = 'LoadingContainer isActive-' + this.props.currencies.isFetching;
		return (<div className={containerClassName}>
			<div className="Loading">
				<p className="Loading-message">Updating rates</p>
			</div>
		</div>)
	}
}

export default connect(mapStateToProps)(Loading);
