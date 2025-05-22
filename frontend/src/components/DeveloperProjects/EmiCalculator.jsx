import React, { useState, useEffect } from "react";

function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(5);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;
    const emiValue =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const total = emiValue * months;
    const interest = total - loanAmount;

    setEmi(emiValue.toFixed(2));
    setTotalInterest(interest.toFixed(2));
    setTotalPayment(total.toFixed(2));
  };

  const principalPercentage =
    totalPayment > 0 ? ((loanAmount / totalPayment) * 100).toFixed(2) : 0;
  const interestPercentage =
    totalPayment > 0 ? ((totalInterest / totalPayment) * 100).toFixed(2) : 0;

  const handleManualInput = (e, setter) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setter(value);
    }
  };

  return (
    <div className="max-w-5xl mx-auto shadow-lg p-6 rounded-xl bg-white">
      <div className="flex gap-6">
        {/* Calculator Section - Left Side */}
        <div className="w-1/2 space-y-5">

          {/* Loan Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Loan Amount (₹)
            </label>
            <div className="flex items-center gap-2 mb-1.5">
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => handleManualInput(e, setLoanAmount)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                min="1000"
                step="1000"
              />
            </div>
            <input
              type="range"
              min="1000"
              max="1000000000"
              step="1000000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
            />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {loanAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Interest Rate (%)
            </label>
            <div className="flex items-center gap-2 mb-1.5">
              <input
                type="number"
                value={interestRate}
                onChange={(e) => handleManualInput(e, setInterestRate)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                min="0.1"
                max="30"
                step="0.1"
              />
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
            />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {interestRate}%
            </div>
          </div>

          {/* Loan Tenure */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Loan Tenure (Years)
            </label>
            <div className="flex items-center gap-2 mb-1.5">
              <input
                type="number"
                value={tenure}
                onChange={(e) => handleManualInput(e, setTenure)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                min="1"
                max="30"
              />
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={tenure}
              onChange={(e) => setTenure(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
            />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {tenure} years
            </div>
          </div>

          {/* Results */}
          <div className="mt-6 space-y-3 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 text-sm mb-2">
              Loan Summary
            </h3>
            <div className="flex justify-between py-1.5 border-b border-gray-200">
              <span className="text-gray-600">Monthly EMI</span>
              <span className="font-semibold text-gray-800">₹ {emi}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-200">
              <span className="text-gray-600">Total Interest</span>
              <span className="font-semibold text-gray-800">
                ₹ {totalInterest}
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-gray-600">Total Payment</span>
              <span className="font-semibold text-gray-800">
                ₹ {totalPayment}
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown Chart - Right Side */}
        <div className="w-1/2">
          <div className="bg-gray-50 p-5 rounded-lg h-full border border-gray-100">
            <h3 className="font-medium text-gray-700 text-base mb-4">
              Payment Breakdown
            </h3>

            {/* Pie Chart */}
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32">
                <div
                  className="absolute w-full h-full rounded-full shadow-sm"
                  style={{
                    background: `conic-gradient(
                      #3b82f6 0% ${interestPercentage}%,
                      #eab308 ${interestPercentage}% 100%
                    )`,
                  }}
                ></div>
                <div className="absolute inset-4 bg-white rounded-full shadow-sm flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {principalPercentage}%
                  </span>
                </div>
              </div>
            </div>

            {/* Breakdown Info */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Principal Amount</span>
                </div>
                <span className="font-medium text-gray-800">
                  ₹ {loanAmount.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Total Interest</span>
                </div>
                <span className="font-medium text-gray-800">
                  ₹ {totalInterest}
                </span>
              </div>

              <div className="pt-3 mt-3 border-t border-gray-200">
                <div className="flex justify-between font-medium">
                  <span className="text-gray-700">Total Payment:</span>
                  <span className="text-gray-800">₹ {totalPayment}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmiCalculator;
