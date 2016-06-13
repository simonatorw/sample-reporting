var ProductRow = React.createClass({
	render: function() {
		return (
			<tr>
				<td className="gridItem">{this.props.product.name}</td>
				<td className="gridItem">{this.props.product.ticker}</td>
				<td className="gridItem money">{this.props.product.last}</td>
				<td className="gridItem">{this.props.product.industry}</td>
				<td className="gridItem">{this.props.product.cap}</td>
			</tr>
		);
	}
});

var EquityGrid = React.createClass({
	render: function() {
		var rows = [];
		var txt = this.props.filterText.split(':');
		var filterRow = txt[0] ? txt[0] : 'industry';
		var filterText = txt[1] ? txt[1] : '';
		this.props.products.forEach(function(product) {
			if (product[filterRow].indexOf(filterText) === -1) {
				return;
			}
			rows.push(<ProductRow product={product} key={product.name} />);
		}.bind(this));
		
		return (
		<section className="content">
			<table className="grid">
				<caption className="gridCaption">Query: {this.props.filterText ? this.props.filterText : 'N/A'}</caption>
				<thead>
					<tr>
						<th className="gridHeader">Company</th>
						<th className="gridHeader">Ticker</th>
						<th className="gridHeader">Last Price</th>
						<th className="gridHeader">Industry</th>
						<th className="gridHeader">Market Cap</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		</section>
		);
	}
});

var Navigation = React.createClass({
	getInitialState: function(){
		return {
			selected: ''
		}
	},
	handleChange: function(e) {
		e.preventDefault();
		var field = $(e.target).parent().parent().prev().text();
		field = field.replace('Reset', '').toLowerCase();
		field = field.replace('market ', '');
		if (e.target.text === 'Reset') {
			this.setState({selected: ''});
			this.props.onUserInput('');			
		} else {
			this.setState({selected: e.target.text});
			this.props.onUserInput(field + ':' + e.target.text);
		}
	},
	isActive: function(val) {
		return this.state.selected === val ? 'navItem selected' : 'navItem';
	},
	render: function() {
		return(
			<nav className="mainNav">
				<div className="navTitle">Industry<a href="#" className="link right" onClick={this.handleChange}>Reset</a></div>
				<ul className="navList">
					<li><a href="#" className={this.isActive('Software')} onClick={this.handleChange}>Software</a></li>
					<li><a href="#" className={this.isActive('Food')} onClick={this.handleChange}>Food</a></li>
				</ul>
				<div className="navTitle">Market Cap</div>
				<ul className="navList">
					<li><a href="#" className={this.isActive('Small')} onClick={this.handleChange}>Small</a></li>
					<li><a href="#" className={this.isActive('Mid')} onClick={this.handleChange}>Mid</a></li>
					<li><a href="#" className={this.isActive('Large')} onClick={this.handleChange}>Large</a></li>
				</ul>
			</nav>
		);
	}
});

var QueryContent = React.createClass({
	getInitialState: function() {
		return {
			filterText: ''
		};
	},

	handleUserInput: function(filterText) {
		this.setState({
			filterText: filterText
		});
	},

	render: function() {
		return (
			<div className="queryContainer">
				<Navigation
					filterText={this.state.filterText}
					onUserInput={this.handleUserInput}
				/>
				<EquityGrid
					products={this.props.products}
					filterText={this.state.filterText}
				/>
			</div>
		);
	}
});

ReactDOM.render(
	<QueryContent products={PRODUCTS} />, document.getElementById('queryContent')
);