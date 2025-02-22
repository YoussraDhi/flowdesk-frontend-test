import React from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 1rem;
  text-align: left;
`;

const TableHeader = styled.th`
  background-color: #333;
  color: #fff;
  padding: 0.75rem;
  border-bottom: 2px solid #444;
  cursor: pointer;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #1a1a1a;
  }
  &:nth-child(odd) {
    background-color: #1a1a1a;
  }
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #444;
  color: #fff;
`;

interface Column {
  header: string;
  accessor: string;
  Cell?: (value: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  onSort?: (column: string) => void;
  sortColumn?: string | null;
  sortDirection?: "asc" | "desc";
  sortableColumns?: string[];
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  onSort,
  sortColumn,
  sortDirection,
  sortableColumns = [],
}) => {
  return (
    <TableContainer>
      <StyledTable role="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <TableHeader
                key={column.accessor}
                onClick={() =>
                  onSort &&
                  sortableColumns.includes(column.accessor) &&
                  onSort(column.accessor)
                }
              >
                {column.header}
                {sortableColumns.includes(column.accessor) && (
                  <span>
                    {sortColumn === column.accessor
                      ? sortDirection === "asc"
                        ? " ▲"
                        : " ▼"
                      : " ↕"}
                  </span>
                )}
              </TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.accessor}>
                  {column.Cell
                    ? column.Cell(row[column.accessor])
                    : row[column.accessor]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default Table;
