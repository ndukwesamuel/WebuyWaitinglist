import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import bgWallet from "../../assets/images/walletBg.png";
const Wallet = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Sample transaction data - replace with actual data from your API
  const transactions = [
    {
      id: 1,
      description: "Deposit from bank account",
      type: "Credit",
      amount: 500.0,
      date: "2025-04-07",
      status: "Completed",
    },
    {
      id: 2,
      description: "Purchase at Electronics Store",
      type: "Debit",
      amount: 149.99,
      date: "2025-04-05",
      status: "Completed",
    },
    {
      id: 3,
      description: "Monthly subscription",
      type: "Debit",
      amount: 9.99,
      date: "2025-04-03",
      status: "Completed",
    },
    {
      id: 4,
      description: "Refund from return",
      type: "Credit",
      amount: 25.5,
      date: "2025-04-01",
      status: "Completed",
    },
    {
      id: 5,
      description: "Transfer to John Doe",
      type: "Debit",
      amount: 50.0,
      date: "2025-03-28",
      status: "Completed",
    },
    {
      id: 6,
      description: "Salary deposit",
      type: "Credit",
      amount: 2500.0,
      date: "2025-03-25",
      status: "Completed",
    },
    {
      id: 7,
      description: "Utility bill payment",
      type: "Debit",
      amount: 120.75,
      date: "2025-03-23",
      status: "Completed",
    },
    {
      id: 8,
      description: "Online shopping",
      type: "Debit",
      amount: 89.95,
      date: "2025-03-20",
      status: "Completed",
    },
    {
      id: 9,
      description: "Friend repayment",
      type: "Credit",
      amount: 35.0,
      date: "2025-03-18",
      status: "Completed",
    },
    {
      id: 10,
      description: "Withdrawal to bank",
      type: "Debit",
      amount: 300.0,
      date: "2025-03-15",
      status: "Processing",
    },
    {
      id: 11,
      description: "Dividend payment",
      type: "Credit",
      amount: 75.25,
      date: "2025-03-12",
      status: "Completed",
    },
    {
      id: 12,
      description: "Restaurant payment",
      type: "Debit",
      amount: 42.5,
      date: "2025-03-10",
      status: "Completed",
    },
  ];

  // Calculate total balance
  const totalBalance = transactions.reduce((acc, transaction) => {
    if (transaction.type === "Credit") {
      return acc + transaction.amount;
    } else {
      return acc - transaction.amount;
    }
  }, 0);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  // Page change handlers
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToPage = (page) => setCurrentPage(page);

  return (
    <div className=" rounded-lg shadow-lg p-6 w-full max-w-6xl mx-auto">
      {/* Wallet Card with Background Image */}
      <div
        className="relative mb-8 rounded-xl overflow-hidden "
        style={{
          backgroundImage: `url(${bgWallet})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Semi-transparent overlay for better text readability */}
        <div className="absolute inset-0 bg-gray-400 bg-opacity-60"></div>

        <div className="relative p-6 h-full flex flex-col md:flex-row justify-between items-start md:items-center text-white z-10">
          <div>
            <h3 className="text-lg opacity-90">Total Balance</h3>
            <h2 className="text-3xl font-bold">#{totalBalance.toFixed(2)}</h2>
          </div>

          <div className="flex mt-4 md:mt-0 space-x-3">
            <button className="bg-[#4A9D44] hover:bg-opacity-90 px-4 py-2 rounded-lg font-medium transition-all">
              Add Money
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg font-medium transition-all">
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Transaction History</h3>

        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.description}
                  </TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell
                    className={` ${
                      transaction.type === "Credit"
                        ? "text-[#4A9D44]"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.type === "Credit" ? "+" : "-"}$
                    {transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-[#4A9D44] hover:bg-green-50"
            }`}
          >
            Previous
          </button>

          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-8 h-8 rounded-full ${
                  currentPage === page
                    ? "bg-[#4A9D44] text-white"
                    : "text-gray-600 hover:bg-green-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-[#4A9D44] hover:bg-green-50"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
