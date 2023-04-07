import React from 'react';

import Select from 'react-select';

interface IProps {
  handleSelect: (selectedYear: string) => void;
  selectedYear: string;
}

const options = [
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
  { value: '2018', label: '2018' },
  { value: '2017', label: '2017' },
  { value: '2016', label: '2016' },
  { value: '2015', label: '2015' },
  { value: '2014', label: '2014' },
];

const SelectYear: React.FC<IProps> = ({ handleSelect, selectedYear }) => {
  const getValue = () => {
    return selectedYear
      ? options.find(item => item.value === selectedYear)
      : '';
  };

  const handleChange = (option: any) => {
    handleSelect(option.value);
  };

  return (
    <div className="select__body">
      <div className="select__label">
        <b>Year:</b>
        <Select
          className="select__select"
          classNamePrefix="select-select"
          options={options}
          onChange={option => handleChange(option)}
          value={getValue()}
        />
      </div>
    </div>
  );
};

export default SelectYear;
