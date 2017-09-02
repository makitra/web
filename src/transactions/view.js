import React, { Component } from 'react';
import { map } from 'underscore';
import moment from 'moment';


import Pagination from 'elements/pagination';
import Processing from 'elements/processing'

const statusOptions = [
  {name: 'All', value: ''}, {name: 'Created', value: 'created'}, {name: 'Moderated', value: 'moderated'},
  {name: 'Unconfirmed', value: 'unconfirmed'}, {name: 'Confirmed', value: 'confirmed'}
];

const dateOptions = [
  {name: 'All', value: ''}, {name:'Today', value: 'day'}, {name: 'This week', value: 'week'},
  {name: 'This month', value: 'month'}, {name: 'Last month', value: 'last_month'}, {name: 'This year', value: 'year'}
];

class Transactions extends Component {
  componentDidMount() {
    const { getList, filter} = this.props;
    getList(filter);
  }

  render() {
    const { updateFilter, filter, updateList, processing, list } = this.props;
    return (
      <div className="transactions">
        {processing ? <Processing />: null}
        <div className="transactions__content">
          <div className="container">
            <div className="row filter">
              <div className="col-md-3">
                <label className="form-label">Date</label>
                <select className="form form-full__width"
                        onChange={e => updateFilter(filter, 'date', e.target.value)}>
                  {dateOptions.map((item, index) =>
                    <option value={item.value} key={index}>{item.name}</option>
                  )}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="transactions__table col-md-12">
                <ResponsiveTable columns={cols} rows={list}/>
              </div>
            </div>
            <div className="row pagination">
              <div className="col-md-12">
                <div className="filter__pagination">
                  <Pagination pagination={this.props.pagination} update={(page)=> updateList(filter, page)}/>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}



class ResponsiveTable extends Component {
  head() {
    let columns = map(this.props.columns, (colName, index) => {
      return (
        <th key={index}>{colName}</th>
      );
    });
    return (
      <tr>
        <th>{this.props.columns['update_stamp']}</th>
        <th>{this.props.columns['type']}</th>
        <th>{this.props.columns['from_hash']}</th>
        <th>{this.props.columns['to_hash']}</th>
        <th>{this.props.columns['status']}</th>
      </tr>
    );
  }

  rows() {
    const { rows, columns } = this.props;
    return  map(rows, function(row, index) {
      let localeTime = moment.utc(row['update_stamp']).toDate();
      localeTime = moment(localeTime).format('YYYY-MM-DD HH:mm:ss');
      return (
        <tr key={index}>
          <td data-label="Time">
            {localeTime}
          </td>
          <td data-label="Type">
            <div className={'transfer'}></div>
          </td>
          <td data-label="From">
            <p>{row['from_hash']}</p>
            <p>{Math.round(row['from_amount']* 100000000) /100000000} {row['from_currency']}</p>
          </td>
          <td data-label="To">
            <p>{row['to_hash']}</p>
            <p>{Math.round(row['to_amount']* 100000000) /100000000} {row['to_currency']}</p>
          </td>
          <td data-label="Status">
            {row['status']}
          </td>

        </tr>
      );
    })
  }

  render() {
    return (
      <table className="responsive-table">
        <thead>
        {this.head()}
        </thead>
        <tbody>
        {this.rows()}
        </tbody>
      </table>
    );
  }
};

let cols = {
  from_hash: 'From',
  type: 'Type',
  from_amount: 'Amount',
  from_currency: 'Currency',
  to_hash: 'To',
  status: 'Status',
  update_stamp: 'Time',
  to_amount: 'Amount (CNX)'
};

export default Transactions;