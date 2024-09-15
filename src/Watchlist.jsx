import React, { useState } from 'react';

const availableCoins = [
  { id: 1, name: 'Bitcoin', symbol: 'BTC' },
  { id: 2, name: 'Ethereum', symbol: 'ETH' },
  { id: 3, name: 'Cardano', symbol: 'ADA' },
  { id: 4, name: 'Solana', symbol: 'SOL' },
  { id: 5, name: 'Dogecoin', symbol: 'DOGE' },
];

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (coin) => {
    if (!watchlist.find((c) => c.id === coin.id)) {
      setWatchlist([...watchlist, coin]);
    }
  };

  const removeFromWatchlist = (coinId) => {
    setWatchlist(watchlist.filter((coin) => coin.id !== coinId));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Your Watchlist</h1>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Coins</h2>
          <ul className="bg-white rounded-lg shadow p-4">
            {availableCoins.map((coin) => (
              <li
                key={coin.id}
                className="flex justify-between items-center mb-2 p-2 border-b last:border-none"
              >
                <span>{coin.name} ({coin.symbol})</span>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                  onClick={() => addToWatchlist(coin)}
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Watchlist</h2>
          <ul className="bg-white rounded-lg shadow p-4">
            {watchlist.length > 0 ? (
              watchlist.map((coin) => (
                <li
                  key={coin.id}
                  className="flex justify-between items-center mb-2 p-2 border-b last:border-none"
                >
                  <span>{coin.name} ({coin.symbol})</span>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                    onClick={() => removeFromWatchlist(coin.id)}
                  >
                    Remove
                  </button>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-600">No coins in watchlist</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
