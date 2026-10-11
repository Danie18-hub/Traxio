import React from 'react';
import { ShipmentStatus } from '@/src/lib/types';
import { CheckCircle2, Clock, Truck, AlertTriangle, FileText, ArrowRight } from 'lucide-react';

interface StatusBadgeProps {
  status: ShipmentStatus | string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true
}) => {
  let badgeStyles = 'bg-slate-100 text-slate-700 border-slate-300';
  let Icon = FileText;

  switch (status) {
    case 'Delivered':
      // Mint green #3DDC97
      badgeStyles = 'bg-[#3DDC97]/20 text-[#0c7048] border-[#3DDC97]/60 font-semibold';
      Icon = CheckCircle2;
      break;
    case 'In Transit':
      // Cobalt blue #0047AB
      badgeStyles = 'bg-[#0047AB]/10 text-[#0047AB] border-[#0047AB]/30 font-semibold';
      Icon = Truck;
      break;
    case 'Out for Delivery':
      // Safety orange #FF6700
      badgeStyles = 'bg-[#FF6700]/15 text-[#cc5200] border-[#FF6700]/40 font-semibold';
      Icon = ArrowRight;
      break;
    case 'Delayed':
      // Safety orange / amber #FF6700
      badgeStyles = 'bg-[#FF6700]/15 text-[#cc5200] border-[#FF6700]/50 font-semibold';
      Icon = AlertTriangle;
      break;
    case 'Picked Up':
      badgeStyles = 'bg-blue-50 text-blue-700 border-blue-200 font-semibold';
      Icon = Clock;
      break;
    case 'Label Created':
    default:
      badgeStyles = 'bg-slate-100 text-slate-700 border-slate-300 font-medium';
      Icon = FileText;
      break;
  }

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs md:text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-sm md:text-base px-3.5 py-1.5 gap-2'
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border transition-all ${sizeStyles} ${badgeStyles}`}
      role="status"
      aria-label={`Status: ${status}`}
    >
      {showIcon && <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />}
      <span>{status}</span>
    </span>
  );
};
