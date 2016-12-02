import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const App = React.createClass ({
	render() {
		return (
			<div className="App">
				<section className="Section Section--header">
					<div className="Section-inner">
						<h1><Link to="/">Lucra</Link></h1>
					</div>
				</section>
				{this.props.children}
			</div>
		)
	}
});

export default App;
