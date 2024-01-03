import React from 'react';
import { Table } from 'antd';

export const VehicleListTable = ({ dataSource, columns, handleRecordClick }) => {
  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 7, simple: "true", size: "small" }}
        onRow={(record) => {
          return {
            onClick: () => handleRecordClick(record),
          };
        }}
      />
    </>
  );
};