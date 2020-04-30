import React from 'react';
import PropTypes from 'prop-types';
import {Button, Icon} from 'semantic-ui-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

class DataBarChart extends React.Component {
  constructor(props) {
    super(props);
    const data = this.props.data
      .filter(x => x.value > 0)
      .sort((a, b) => (a.value > b.value ? -1 : 1));
    this.state = {
      data,
      valueSortDirection: 'desc',
      nameSortDirection: 'asc',
      loading: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data.length !== prevProps.data.length) {
      const data = this.props.data
        .filter(x => x.value > 0)
        .sort((a, b) => (a.value > b.value ? -1 : 1));
      this.setState({
        data,
      });
    }
  }

  handleClick = e => {
    const payload =
      e && e.activePayload && e.activePayload[0] && e.activePayload[0].payload;
    if (payload) {
      this.props.handleClick(payload);
    }
  };

  sortData = field => {
    this.setState({loading: true}, () => {
      const {data, valueSortDirection, nameSortDirection} = this.state;
      let newSortDirection = 'asc';
      let sortDirection = 'valueSortDirection';
      if (field === 'value') {
        if (valueSortDirection === 'asc') {
          newSortDirection = 'desc';
        }
      } else {
        sortDirection = 'nameSortDirection';
        if (nameSortDirection === 'asc') {
          newSortDirection = 'desc';
        }
      }
      const sortedData = data;
      let sortValues = [-1, 1];
      if (newSortDirection === 'asc') {
        sortValues = [1, -1];
      }
      sortedData.sort((a, b) =>
        a[field] > b[field] ? sortValues[0] : sortValues[1],
      );
      this.setState({
        data: sortedData,
        [sortDirection]: newSortDirection,
        loading: false,
      });
    });
  };

  render() {
    const {data, nameSortDirection, valueSortDirection, loading} = this.state;
    const barSize = 20;
    let height = Math.max(barSize * data.length + 4, 120);
    if (data.length > 0) {
      return (
        <div className="bar-chart">
          <Button onClick={() => this.sortData('value')} size="tiny">
            Sort by Value
            <Icon
              name={'chevron '.concat(
                valueSortDirection === 'asc' ? 'up' : 'down',
              )}
              size="tiny"
            />
          </Button>
          <Button size="tiny" onClick={() => this.sortData('name')}>
            Sort by Name
            <Icon
              name={'chevron '.concat(
                nameSortDirection === 'asc' ? 'up' : 'down',
              )}
              size="tiny"
            />
          </Button>
          {loading ? null : (
            <ResponsiveContainer height={height}>
              <BarChart
                data={data}
                margin={{
                  top: 10,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
                layout="vertical"
                onClick={this.handleClick}
              >
                <XAxis type="number" orientation="top" />
                <YAxis width={250} type="category" dataKey="name" />
                <Tooltip />
                <Bar dataKey="value" fill="#41b6e6" barSize={barSize} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      );
    } else {
      return <p>No Data</p>;
    }
  }
}

DataBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ),
  handleClick: PropTypes.func,
};

DataBarChart.defaultProps = {
  data: [],
  handleClick: () => {},
};

export default DataBarChart;
