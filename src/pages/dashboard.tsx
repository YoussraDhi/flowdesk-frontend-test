import React, { useEffect, useState } from "react";
import { useTickerStore } from "@/store/tickerStore";
import Table from "@/components/Table";
import styled from "styled-components";
import { Ticker } from "../types/Ticker";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  gap: 32px;
  padding-top: 32px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #333;
    color: #fff;
    border: none;
    cursor: pointer;
    &:disabled {
      background-color: #555;
      cursor: not-allowed;
    }
  }

  span {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
  }
`;

const ChangeCell = (value: string) => {
  const numericValue = parseFloat(value);
  const color = numericValue < 0 ? "red" : "green";
  const sign = numericValue > 0 ? "+" : "";
  return <span style={{ color }}>{`${sign}${value}%`}</span>;
};

export const Dashboard = () => {
  const tickers = useTickerStore((state) => state.tickers);
  const fetchTickers = useTickerStore((state) => state.fetchTickers);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchTickers();
  }, [fetchTickers]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayedTickers = tickers
    .filter((t: Ticker) => t.symbol.includes("USD") && t.count > 0)
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns = [
    { header: "Symbol", accessor: "symbol" },
    { header: "Price", accessor: "lastPrice" },
    { header: "Change", accessor: "priceChangePercent", Cell: ChangeCell },
    { header: "Count", accessor: "count" },
  ];

  return (
    <main>
      {displayedTickers.length > 0 ? (
        <DashboardContainer>
          <Table columns={columns} data={displayedTickers} />
          <PaginationContainer>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage * itemsPerPage >= tickers.length}
            >
              Next
            </button>
          </PaginationContainer>
        </DashboardContainer>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};
