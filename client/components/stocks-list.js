import React from 'react';
import PropTypes from 'prop-types';
import Stock from './stock';


const StocksList = ({ stocks }) => (
  <div>
    {stocks.map(stock =>
      <Stock
        key={stock.id}
        {...stock}
      />
    )}
  </div>
);
StocksList.propTypes = {
  stocks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    currentPrice: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};

export default StocksList;
