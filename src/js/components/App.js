import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Loading from './Loading'

const App = React.createClass ({
	render() {
		return (
			<div className="App">
				<Loading />
				<section className="Section Section--pageHeader">
					<div className="Section-inner">
						<h1><Link to="/">Conversion</Link></h1>
					</div>
				</section>
				{this.props.children}
			</div>
		)
	}
});

export default App;
