import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, ArrowRight, RefreshCw } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import SpotlightCard from './SpotlightCard';

const formulas = [
  { 
    id: 'force', 
    name: 'বল (Force)', 
    formula: 'F = m × a', 
    inputs: [
      { key: 'm', label: 'ভর (Mass)', unit: 'kg' }, 
      { key: 'a', label: 'ত্বরণ (Acceleration)', unit: 'm/s²' }
    ], 
    resultUnit: 'N (Newton)' 
  },
  { 
    id: 'work', 
    name: 'কাজ (Work)', 
    formula: 'W = F × d', 
    inputs: [
      { key: 'f', label: 'বল (Force)', unit: 'N' }, 
      { key: 'd', label: 'দূরত্ব (Distance)', unit: 'm' }
    ], 
    resultUnit: 'J (Joule)' 
  },
  { 
    id: 'speed', 
    name: 'গতি (Speed)', 
    formula: 'v = d / t', 
    inputs: [
      { key: 'd', label: 'দূরত্ব (Distance)', unit: 'm' }, 
      { key: 't', label: 'সময় (Time)', unit: 's' }
    ], 
    resultUnit: 'm/s' 
  },
];

export default function PhysicsCalculator() {
  const [selectedFormula, setSelectedFormula] = useState(formulas[0]);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | null>(null);

  const handleInputChange = (key: string, value: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
    setResult(null); // Reset result when input changes
  };

  const handleCalculate = () => {
    let res = 0;
    const vals = inputs;
    
    if (selectedFormula.id === 'force') {
      res = (parseFloat(vals.m) || 0) * (parseFloat(vals.a) || 0);
    } else if (selectedFormula.id === 'work') {
      res = (parseFloat(vals.f) || 0) * (parseFloat(vals.d) || 0);
    } else if (selectedFormula.id === 'speed') {
      const t = parseFloat(vals.t) || 0;
      res = t !== 0 ? (parseFloat(vals.d) || 0) / t : 0;
    }
    
    setResult(Number(res.toFixed(4))); // Round to 4 decimal places
  };

  const handleReset = () => {
    setInputs({});
    setResult(null);
  };

  return (
    <section id="physics-calculator" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-400 mb-6">
            <Calculator size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 font-bengali transition-colors">
            ফিজিক্স ক্যালকুলেটর
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-bengali transition-colors">
            জটিল ফিজিক্সের সূত্রগুলো এখন সহজেই হিসাব করুন। প্রয়োজনীয় মান বসিয়ে মুহূর্তেই ফলাফল পেয়ে যান।
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <SpotlightCard className="bg-[#FAFAFA] dark:bg-slate-800 rounded-[2.5rem] shadow-xl border border-slate-200/80 dark:border-slate-700 overflow-hidden">
            <div className="grid md:grid-cols-5 h-full">
              {/* Sidebar / Formula Selector */}
              <div className="md:col-span-2 bg-white dark:bg-slate-800/50 border-r border-slate-100 dark:border-slate-700 p-6 md:p-8 transition-colors">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 font-bengali transition-colors">সূত্র নির্বাচন করুন</h3>
                <div className="space-y-3">
                  {formulas.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setSelectedFormula(f);
                        setInputs({});
                        setResult(null);
                      }}
                      className={cn(
                        "w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 font-bengali flex items-center justify-between group",
                        selectedFormula.id === f.id 
                          ? "bg-gradient-navy text-white shadow-md shadow-blue-900/20" 
                          : "bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600"
                      )}
                    >
                      <div>
                        <div className="font-bold">{f.name}</div>
                        <div className={cn(
                          "text-sm font-mono mt-1",
                          selectedFormula.id === f.id ? "text-white/80" : "text-slate-400 dark:text-slate-400"
                        )}>
                          {f.formula}
                        </div>
                      </div>
                      <ArrowRight size={18} className={cn(
                        "transition-transform duration-300",
                        selectedFormula.id === f.id ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                      )} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculator Area */}
              <div className="md:col-span-3 p-6 md:p-8 flex flex-col">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 font-bengali flex items-center gap-3 transition-colors">
                    {selectedFormula.name}
                    <span className="text-sm font-mono bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-lg transition-colors">
                      {selectedFormula.formula}
                    </span>
                  </h3>
                </div>

                <div className="space-y-6 flex-grow">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedFormula.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      {selectedFormula.inputs.map((input) => (
                        <div key={input.key}>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 font-bengali transition-colors">
                            {input.label}
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={inputs[input.key] || ''}
                              onChange={(e) => handleInputChange(input.key, e.target.value)}
                              placeholder="0.00"
                              className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/40 focus:border-primary dark:focus:border-primary transition-all outline-none font-mono text-lg text-slate-900 dark:text-white"
                            />
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-mono text-sm">
                              {input.unit}
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700 transition-colors">
                  <div className="flex items-center gap-4 mb-6">
                    <button 
                      onClick={handleCalculate}
                      className="flex-1 bg-gradient-navy hover:bg-gradient-navy-hover text-white py-4 rounded-2xl font-bengali font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-blue-900/30 hover:-translate-y-0.5 transition-all active:scale-95"
                    >
                      হিসাব করুন
                    </button>
                    <button 
                      onClick={handleReset}
                      className="w-14 h-14 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors active:scale-95"
                      title="Reset"
                    >
                      <RefreshCw size={20} />
                    </button>
                  </div>

                  <AnimatePresence>
                    {result !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30 rounded-2xl p-6 flex items-center justify-between"
                      >
                        <div className="font-bengali text-slate-600 dark:text-slate-300 font-medium transition-colors">ফলাফল:</div>
                        <div className="text-3xl font-bold text-primary dark:text-blue-400 font-mono flex items-baseline gap-2 transition-colors">
                          {result} <span className="text-lg text-primary/70 dark:text-blue-400/70">{selectedFormula.resultUnit}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
