
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  subValue?: string;
  colorClass?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, subValue, colorClass = "text-sky-400" }) => {
  return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between neon-border h-full transition-transform hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">{label}</span>
        <div className={`p-2 rounded-lg bg-slate-800/50 ${colorClass}`}>
          {icon}
        </div>
      </div>
      <div>
        <div className={`text-3xl font-bold ${colorClass}`}>{value}</div>
        {subValue && <div className="text-slate-500 text-sm mt-1">{subValue}</div>}
      </div>
    </div>
  );
};

export default StatCard;
