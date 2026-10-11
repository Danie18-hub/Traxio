import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQAccordionProps {
  items: FAQItem[];
  allowMultiple?: boolean;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items, allowMultiple = false }) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    if (allowMultiple) {
      if (openIndices.includes(index)) {
        setOpenIndices(openIndices.filter((i) => i !== index));
      } else {
        setOpenIndices([...openIndices, index]);
      }
    } else {
      setOpenIndices(openIndices.includes(index) ? [] : [index]);
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        return (
          <div
            key={index}
            className="border border-slate-200 rounded-lg bg-white overflow-hidden transition-all duration-200 hover:border-slate-300"
          >
            <button
              type="button"
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-slate-900 hover:text-[#0047AB] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0047AB]"
              aria-expanded={isOpen}
            >
              <span className="text-sm sm:text-base pr-4">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-[#0047AB]' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-4 sm:px-5 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
