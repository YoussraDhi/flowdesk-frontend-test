import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Components
import Table from "@/components/ui/Table";
import Dropover from "@/components/ui/Dropovoer";

//Store
import { useTickerStore } from "@/store/tickerStore";

// Types
import { Ticker } from "@/types/Ticker";
import Loader from "@/components/ui/Loader";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin-top: 2rem;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  max-width: 1200px;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  gap: 32px;
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

const roundPrice = (price: string) => {
  return <span>{Number(price).toFixed(4)}</span>;
};

const formattedTime = (time: number) => {
  return <span>{new Date(time).toLocaleString()}</span>;
};

const Dashboard = () => {
  const tickers = useTickerStore((state) => state.tickers);
  const fetchTickers = useTickerStore((state) => state.fetchTickers);
  const currencyBase = useTickerStore((state) => state.currencyBase);
  const currencyBaseOptions = useTickerStore(
    (state) => state.currencyBaseOptions
  );
  const setCurrencyBase = useTickerStore((state) => state.setCurrencyBase);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetchTickers();
  }, [fetchTickers]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedTickers = [...tickers]
    .filter((t: Ticker) => t.symbol.includes(`${currencyBase}`) && t.count > 0)
    .sort((a, b) => {
      if (!sortColumn) return 0;
      const aValue = a[sortColumn as keyof Ticker];
      const bValue = b[sortColumn as keyof Ticker];
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const displayedTickers = sortedTickers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { header: "Symbol", accessor: "symbol" },
    { header: "Price", accessor: "lastPrice", Cell: roundPrice },
    { header: "Count", accessor: "count" },
    { header: "Volume", accessor: "volume", Cell: roundPrice },
    { header: "openTime", accessor: "openTime", Cell: formattedTime },
    { header: "closeTime", accessor: "closeTime", Cell: formattedTime },
    { header: "Change", accessor: "priceChangePercent", Cell: ChangeCell },
  ];

  return (
    <main>
      <PageContainer>
        {displayedTickers.length > 0 ? (
          <>
            <DashboardHeader>
              <Dropover
                options={currencyBaseOptions}
                value={currencyBase}
                onChange={(currency: string) => setCurrencyBase(currency)}
              />
            </DashboardHeader>
            <DashboardContainer>
              <Table
                columns={columns}
                data={displayedTickers}
                onSort={handleSort}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                sortableColumns={[
                  "lastPrice",
                  "count",
                  "openTime",
                  "closeTime",
                  "volume",
                ]}
              />
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
          </>
        ) : (
          <Loader />
        )}
      </PageContainer>
    </main>
  );
};

export default Dashboard;
