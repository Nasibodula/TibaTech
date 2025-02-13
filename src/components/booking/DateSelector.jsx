import React from 'react';

const DateSelector = ({
  selectedDate,
  handleDateSelect,
  availableDates
}) => (
  <div className="mb-4">
    <h3 className="h4 mb-3">Select date:</h3>
    <div className="row g-3">
      {availableDates.map((date) => (
        <div className="col-4 col-lg-3 col-xl-2" key={date.date}>
          <button
            onClick={() => handleDateSelect(date.date)}
            className={`btn w-100 ${
              selectedDate?.date === date.date
                ? 'btn-success'
                : 'btn-light'
            }`}
          >
            {date.date}
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default DateSelector;