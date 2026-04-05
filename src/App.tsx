/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Delete, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [current, setCurrent] = useState('0');
  const [previous, setPrevious] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  const handleNumber = (num: string) => {
    setCurrent(prev => (prev === '0' ? num : prev + num));
  };

  const handleOperator = (op: string) => {
    setPrevious(current);
    setCurrent('0');
    setOperator(op);
  };

  const calculate = () => {
    if (!previous || !operator) return;
    const prev = parseFloat(previous);
    const curr = parseFloat(current);
    let result = 0;
    switch (operator) {
      case '+': result = prev + curr; break;
      case '-': result = prev - curr; break;
      case '*': result = prev * curr; break;
      case '/': result = prev / curr; break;
    }
    setCurrent(result.toString());
    setPrevious(null);
    setOperator(null);
  };

  const clear = () => {
    setCurrent('0');
    setPrevious(null);
    setOperator(null);
  };

  const deleteLast = () => {
    setCurrent(prev => (prev.length === 1 ? '0' : prev.slice(0, -1)));
  };

  const buttons = [
    ['AC', 'DEL', '/', '*'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['0', '.'],
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-900 p-6 rounded-3xl shadow-2xl w-full max-w-sm border border-zinc-800"
      >
        <div className="text-white p-4 mb-6 text-right text-4xl font-light font-mono overflow-x-auto tracking-wider">
          {previous} {operator} {current}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {buttons.flat().map((btn) => (
            <button
              key={btn}
              onClick={() => {
                if (btn === 'AC') clear();
                else if (btn === 'DEL') deleteLast();
                else if (btn === '=') calculate();
                else if (['+', '-', '*', '/'].includes(btn)) handleOperator(btn);
                else handleNumber(btn);
              }}
              className={`p-4 rounded-full text-xl font-medium transition-all duration-200 ${
                ['+', '-', '*', '/', '='].includes(btn)
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : ['AC', 'DEL'].includes(btn)
                  ? 'bg-zinc-700 text-zinc-200 hover:bg-zinc-600'
                  : 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700'
              } ${btn === '0' ? 'col-span-2 rounded-full' : ''}`}
            >
              {btn === 'DEL' ? <Delete size={24} className="mx-auto" /> : btn}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
