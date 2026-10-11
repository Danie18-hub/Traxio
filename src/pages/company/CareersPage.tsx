import React, { useState } from 'react';
import { CompanyLayout } from './CompanyLayout';
import { useToast } from '@/src/components/ui/Toast';
import { Briefcase, MapPin, Clock, ArrowRight, Check } from 'lucide-react';

interface JobPosition {
  id: string;
  title: string;
  department: 'Operations & Dispatch' | 'Aviation & Freight' | 'Engineering' | 'Customer Solutions';
  location: string;
  type: string;
  description: string;
}

export const CareersPage: React.FC = () => {
  const [filterDept, setFilterDept] = useState('All');
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { success } = useToast();

  const jobs: JobPosition[] = [
    {
      id: 'job-1',
      title: 'Senior Flight Operations Dispatcher',
      department: 'Aviation & Freight',
      location: 'Chicago Gateway Terminal (ORD), IL',
      type: 'Full-time',
      description: 'Coordinate transcontinental cargo aircraft flight plans, weight balance manifests, and air route contingencies.'
    },
    {
      id: 'job-2',
      title: 'Regional Logistics Hub Supervisor',
      department: 'Operations & Dispatch',
      location: 'Dallas National Sorting Hub (DFW), TX',
      type: 'Full-time',
      description: 'Oversee automated cross-dock package sorting conveyors, inbound truck staging, and team safety compliance.'
    },
    {
      id: 'job-3',
      title: 'Full Stack Logistics Software Engineer',
      department: 'Engineering',
      location: 'New York, NY (Hybrid)',
      type: 'Full-time',
      description: 'Build high-throughput telemetry microservices, courier GPS dispatch tracking webhooks, and modern customer portals.'
    },
    {
      id: 'job-4',
      title: 'International Customs Clearance Specialist',
      department: 'Customer Solutions',
      location: 'Newark Air Freight Facility (EWR), NJ',
      type: 'Full-time',
      description: 'Audit electronic commercial invoices, verify Harmonized System (HS) classifications, and liaise with US Customs and Border Protection.'
    },
    {
      id: 'job-5',
      title: 'Commercial Fleet Route Optimization Analyst',
      department: 'Operations & Dispatch',
      location: 'Seattle, WA',
      type: 'Full-time',
      description: 'Analyze telemetry sensor logs, reduce final-mile delivery fuel burn, and schedule electric vehicle charging cycles.'
    }
  ];

  const filtered = filterDept === 'All' ? jobs : jobs.filter((j) => j.department === filterDept);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      success(`Application submitted for ${selectedJob?.title}! We will reach out to ${applicantEmail}.`);
      setSelectedJob(null);
      setSubmitted(false);
      setApplicantName('');
      setApplicantEmail('');
    }, 1000);
  };

  return (
    <CompanyLayout
      title="Careers at Traxio"
      subtitle="Join a team powering global transportation, aerospace logistics, and high-efficiency package sorting."
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Build the Future of Logistics</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            We are looking for dedicated dispatchers, airline cargo planners, software engineers, and customer advocates to drive forward our world-class delivery infrastructure.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 text-xs">
          {['All', 'Operations & Dispatch', 'Aviation & Freight', 'Engineering', 'Customer Solutions'].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setFilterDept(d)}
              className={`px-3.5 py-1.5 rounded-full border font-semibold transition-colors ${
                filterDept === d
                  ? 'bg-[#0047AB] text-white border-[#0047AB]'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Jobs List */}
        <div className="space-y-3">
          {filtered.map((job) => (
            <div
              key={job.id}
              className="p-5 rounded-xl border border-slate-200 hover:border-[#0047AB] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50"
            >
              <div>
                <span className="text-[11px] font-bold text-[#0047AB] uppercase tracking-wider block mb-0.5">
                  {job.department}
                </span>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">{job.title}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.type}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedJob(job)}
                className="px-4 py-2 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs self-start sm:self-auto shrink-0"
              >
                View & Apply
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Application Dialog Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[10px] font-bold text-[#0047AB] uppercase">{selectedJob.department}</span>
                <h3 className="text-base font-bold text-slate-900">{selectedJob.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-600 leading-relaxed mb-4">{selectedJob.description}</p>

            <form onSubmit={handleApply} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  required
                  placeholder="e.g. Jane Doe"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  required
                  placeholder="jane@domain.com"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">LinkedIn Profile or Resume Link</label>
                <input
                  type="text"
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2 font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitted}
                  className="px-5 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold rounded-lg uppercase tracking-wider"
                >
                  {submitted ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </CompanyLayout>
  );
};
