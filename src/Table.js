import React from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';
import orderBy from 'lodash/orderBy';
import { Table } from 'reactstrap';

const SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC'
};

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

class SortableTable extends React.Component {
  constructor() {
    super();
    this.state = {
      sortDir: {},
      list: []
    };
    this.sortTable = this.sortTable.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
  }

  componentWillMount() {
    const { price_list } = this.props;
    this.setState({ list: price_list });
  }

  componentWillReceiveProps(nextProps) {
    const { price_list } = nextProps;
    this.setState({ list: price_list });
  }

  onSortChange(propertyName, evt) {
    evt.preventDefault();
    this.sortTable(this.state.sortDir[propertyName], propertyName);
    const sortDir = this.state.sortDir;
    this.setState({
      sortDir: {
        [propertyName]: reverseSortDirection(sortDir[propertyName])
      }
    });
  }

  sortTable(sortDir = 'ASC', columnName) {
    this.setState({ list: orderBy(this.props.price_list, [columnName], [sortDir.toLowerCase()]) });
  }

  tableRender(list) {
    return list.filter(elem => this.props.checked.indexOf(elem.device) >= 0).map((elem, index) =>
      <tr key={elem.id}>
        <th scope="row">
          {index + 1}
        </th>
        <td>
          {elem.name}
        </td>
        <td>
          <Rating step={1} fractions={10} initialRate={elem.rating} readonly />
        </td>
        <td>
          {elem.price}
        </td>
      </tr>
    );
  }

  render() {
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th onClick={this.onSortChange.bind(this, 'name')}>Product Name</th>
            <th onClick={this.onSortChange.bind(this, 'rating')}>Rating</th>
            <th onClick={this.onSortChange.bind(this, 'price')}>Price</th>
          </tr>
        </thead>
        <tbody>
          {this.tableRender(this.state.list)}
        </tbody>
      </Table>
    );
  }
}

SortableTable.propTypes = {
  price_list: PropTypes.arrayOf(PropTypes.object).isRequired,
  checked: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default SortableTable;
