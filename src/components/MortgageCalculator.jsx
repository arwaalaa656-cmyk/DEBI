import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calculator, DollarSign, Percent, Calendar, ShieldCheck, TrendingUp, Info } from 'lucide-react';

export default function MortgageCalculator({ defaultPrice = 2450000 }) {
  const { formatPrice, currency } = useApp();

  const [price, setPrice] = useState(defaultPrice);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(4.25);
  const [loanYears, setLoanYears] = useState(20);
  const [estimatedMonthlyRent, setEstimatedMonthlyRent] = useState(Math.round(defaultPrice * 0.0055));

  // Calculations
  const downPaymentAmount = (price * downPaymentPct) / 100;
  const loanPrincipal = Math.max(0, price - downPaymentAmount);
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanYears * 12;

  const monthlyMortgage =
    monthlyRate > 0 && totalMonths > 0
      ? (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanPrincipal / (totalMonths || 1);

  // Moroccan Notary & Registration Fees breakdown:
  // - 4% Registration Duty (Droits d'enregistrement)
  // - 1.5% Land Registry (Conservation Foncière)
  // - 1% Notary honorarium + 0.5% Misc stamps
  const notaryFeesTotal = price * 0.065;

  // Annual Gross Rental Yield
  const annualGrossRent = estimatedMonthlyRent * 12;
  const grossRentalYield = price > 0 ? ((annualGrossRent / price) * 100).toFixed(2) : '0';

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#8E1B2D] flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Mortgage & Investment Yield Calculator
            </h3>
            <p className="text-xs text-stone-500">
              Moroccan financing estimation and notary acquisition structuring
            </p>
          </div>
        </div>
        <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-stone-100 text-stone-700 rounded-lg">
          Morocco Advisory
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-4 text-xs">
          {/* Property Value */}
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 flex justify-between">
              <span>Property Price</span>
              <span className="text-stone-900 font-bold">{formatPrice(price)}</span>
            </label>
            <input
              type="range"
              min="300000"
              max="6000000"
              step="50000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-[#8E1B2D] cursor-pointer"
            />
          </div>

          {/* Down Payment % */}
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 flex justify-between">
              <span>Down Payment ({downPaymentPct}%)</span>
              <span className="text-stone-900 font-bold">{formatPrice(downPaymentAmount)}</span>
            </label>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(Number(e.target.value))}
              className="w-full accent-[#8E1B2D] cursor-pointer"
            />
          </div>

          {/* Interest Rate */}
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 flex justify-between">
              <span>Annual Interest Rate</span>
              <span className="text-stone-900 font-bold">{interestRate.toFixed(2)}%</span>
            </label>
            <input
              type="range"
              min="2.5"
              max="7.5"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-[#8E1B2D] cursor-pointer"
            />
          </div>

          {/* Loan Duration */}
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 flex justify-between">
              <span>Loan Duration</span>
              <span className="text-stone-900 font-bold">{loanYears} Years ({totalMonths} mos)</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[10, 15, 20, 25].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setLoanYears(yr)}
                  className={`py-1.5 rounded-lg border font-semibold transition cursor-pointer ${
                    loanYears === yr
                      ? 'bg-[#8E1B2D] text-white border-[#8E1B2D]'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {yr} Yrs
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Box */}
        <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/90 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div>
              <span className="text-[11px] text-stone-500 uppercase font-semibold block">
                Estimated Monthly Payment
              </span>
              <div className="font-serif text-3xl font-bold text-stone-900 mt-0.5">
                {formatPrice(Math.round(monthlyMortgage))}
                <span className="text-xs font-normal text-stone-500"> / month</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-stone-200 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Loan Principal Amount:</span>
                <span className="font-semibold text-stone-900">{formatPrice(loanPrincipal)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Total Down Payment:</span>
                <span className="font-semibold text-stone-900">{formatPrice(downPaymentAmount)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span className="flex items-center gap-1">
                  <span>Moroccan Notary & Stamp Fees (~6.5%):</span>
                  <Info className="w-3 h-3 text-stone-400" />
                </span>
                <span className="font-semibold text-[#8E1B2D]">{formatPrice(Math.round(notaryFeesTotal))}</span>
              </div>
            </div>

            {/* Investment Yield Box */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 text-xs">
              <div className="flex items-center justify-between text-emerald-900">
                <span className="font-semibold flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  Estimated Rental Yield
                </span>
                <span className="font-bold text-sm text-emerald-700">{grossRentalYield}% Gross</span>
              </div>
              <p className="text-[11px] text-emerald-800">
                Based on seasonal luxury rental demand in prime Moroccan locations.
              </p>
            </div>
          </div>

          <p className="text-[10px] text-stone-400 leading-tight">
            * Estimates are indicative and do not constitute formal banking underwriting. Financing for non-residents is subject to Moroccan central bank (Bank Al-Maghrib) approval.
          </p>
        </div>
      </div>
    </div>
  );
}
