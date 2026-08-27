import { useState, useEffect } from 'react';

export const useJobs = () => {
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('smartWorkerJobs');
    return saved ? JSON.parse(saved) : [];
  });

  const [proposals, setProposals] = useState(() => {
    const saved = localStorage.getItem('smartWorkerProposals');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('smartWorkerJobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('smartWorkerProposals', JSON.stringify(proposals));
  }, [proposals]);

  const postJob = (jobData) => {
    const newJob = {
      id: Date.now().toString(),
      status: 'open',
      createdAt: new Date().toISOString(),
      ...jobData
    };
    setJobs([newJob, ...jobs]);
  };

  const closeJob = (jobId) => {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, status: 'closed' } : j));
  };

  const deleteJob = (jobId) => {
    setJobs(jobs.filter(j => j.id !== jobId));
  };

  const submitProposal = (proposalData) => {
    const newProposal = {
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...proposalData
    };
    setProposals([newProposal, ...proposals]);
  };

  const updateProposalStatus = (proposalId, newStatus) => {
    setProposals(proposals.map(p => p.id === proposalId ? { ...p, status: newStatus } : p));
  };

  return {
    jobs,
    proposals,
    postJob,
    closeJob,
    deleteJob,
    submitProposal,
    updateProposalStatus
  };
};
