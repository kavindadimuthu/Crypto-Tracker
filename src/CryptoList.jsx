import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const CryptoList = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page (user adjustable)
  const [totalItems, setTotalItems] = useState(0); // Total number of items from backend
  const [totalPages, setTotalPages] = useState(1); // Total pages based on the rows per page

  // Declare style variables for reusability
  const tableContainer = "flex justify-center py-10";
  const tableWrapper = "w-full max-w-4xl";
  const tableStyles = "w-full table-auto border-separate border-spacing-y-2 shadow-lg";
  const tableHeader = "bg-gray-100 text-gray-700 font-bold py-2";
  const tableRow = "bg-white hover:bg-gray-100 transition-colors duration-200";
  const tableCell = "border-t py-3 text-center";

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/crypto/getCrypto", {
          params: {
            page,
            limit: rowsPerPage, // Send the rows per page to backend
          },
        });
        const data = response.data;
        setCryptos(data.items || []); // Assuming 'items' is an array of cryptocurrencies
        setTotalItems(data.totalItems); // Assuming totalItems is returned from backend
        setTotalPages(data.totalPages); // Assuming totalPages is returned from backend
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    // Fetch data initially and whenever page or rowsPerPage changes
    fetchCryptos();

    // Real-time update using setInterval (every 3 seconds)
    const interval = setInterval(() => {
      fetchCryptos();
    }, 30000); // 3000 ms = 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [page, rowsPerPage]);

  // Handle page change
  const handleChangePage = (event, value) => {
    setPage(value); // Update the page number
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value); // Update rows per page
    setPage(1); // Reset to page 1 when rows per page changes
  };

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  // Calculate start and end indices for "Showing X - Y out of Z"
  const startItem = (page - 1) * rowsPerPage + 1;
  const endItem = Math.min(startItem + rowsPerPage - 1, totalItems);

  return (
    <div className={tableContainer}>
      <div className={tableWrapper}>
        <h1 className="text-2xl font-bold text-center mb-6">Top Cryptocurrencies</h1>
        <table className={tableStyles}>
          <thead>
            <tr>
              <th className={tableHeader}>Rank</th>
              <th className={tableHeader}>Name</th>
              <th className={tableHeader}>Symbol</th>
              <th className={tableHeader}>Price (USD)</th>
              <th className={tableHeader}>Market Cap (USD)</th>
              <th className={tableHeader}>24h % Change</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto) => (
              <tr key={crypto.id} className={tableRow}>
                <td className={tableCell}>{crypto.cmc_rank}</td>
                <td className={tableCell}>{crypto.name}</td>
                <td className={tableCell}>{crypto.symbol}</td>
                <td className={tableCell}>${crypto.quote.USD.price.toFixed(2)}</td>
                <td className={tableCell}>${crypto.quote.USD.market_cap.toLocaleString()}</td>
                <td
                  className={tableCell}
                  style={{
                    color: crypto.quote.USD.percent_change_24h > 0 ? "green" : "red",
                  }}
                >
                  {crypto.quote.USD.percent_change_24h.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
      {/* Displaying "Showing X - Y out of Z" */}
      <div className="flex-1 text-left">
        Showing {startItem} - {endItem} out of {totalItems}
      </div>


      {/* Pagination Component */}
      <div className="flex-2 flex justify-center">
        <Stack spacing={2}>
          <Pagination
            count={totalPages} // Total number of pages
            page={page} // Current page
            onChange={handleChangePage} // Handle page change
            color="primary"
          />
        </Stack>
      </div>

      {/* Rows Per Page Select */}
      <div className="flex-1 flex justify-end items-center">
        <label className="mr-2">Rows</label>
        <Select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          // className="w-24"
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>

      </div>

    </div>
      </div>
    </div>
  );
};

export default CryptoList;
