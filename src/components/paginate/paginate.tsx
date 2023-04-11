import React from 'react';

import { Pagination } from '@mui/material';

interface IProps {
  totalPage: number;
  page: number;
  handlePage: (num: number) => void;
}

const Paginate: React.FC<IProps> = ({ totalPage, page, handlePage }) => {
  return (
    <div className="paginate">
      <Pagination
        className="paginate__items"
        variant="outlined"
        shape="rounded"
        count={totalPage}
        page={page}
        onChange={(_, num) => handlePage(num)}
      />
    </div>
  );
};

export default Paginate;
