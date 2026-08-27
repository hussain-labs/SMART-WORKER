import { useState, useEffect } from 'react';

const STORAGE_KEY = 'smartWorkerServices';

const initialMockServices = [
  {
    id: 's1',
    workerId: 'mock-worker-1',
    workerName: 'Alex Developer',
    workerAvatar: '',
    rating: 4.9,
    reviewsCount: 38,
    level: 'Top Rated ⭐',
    title: 'I will build a modern React & Tailwind web app',
    category: 'Web Development',
    coverImage: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=600&auto=format&fit=crop',
    description: 'I will create a fully responsive, high-performance web application using React.js and Tailwind CSS. Whether you need a landing page, a dashboard, or a full SaaS platform, I deliver clean, maintainable code and beautiful UI.',
    packages: {
      basic: {
        title: 'Single Page Landing',
        description: 'A beautiful single-page responsive landing page.',
        deliveryDays: 3,
        revisions: 1,
        price: 80,
        features: ['1 Page', 'Responsive Design', 'Source Code']
      },
      standard: {
        title: 'Multi-Page Website',
        description: 'Up to 5 pages corporate or portfolio website with routing.',
        deliveryDays: 7,
        revisions: 3,
        price: 250,
        features: ['5 Pages', 'Responsive Design', 'Source Code', 'Custom Assets']
      },
      premium: {
        title: 'Full Web Application',
        description: 'Complex web app with state management, API integration, and auth setup.',
        deliveryDays: 14,
        revisions: 'Unlimited',
        price: 600,
        features: ['10+ Pages', 'State Management', 'API Integration', 'Source Code', 'Priority Support']
      }
    }
  },
  {
    id: 's2',
    workerId: 'mock-worker-2',
    workerName: 'Sarah Designs',
    workerAvatar: '',
    rating: 5.0,
    reviewsCount: 124,
    level: 'Level 2 Seller',
    title: 'I will design a stunning UI/UX for your mobile app',
    category: 'UI/UX Design',
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop',
    description: 'I will design a modern, user-friendly, and engaging UI/UX for your iOS or Android app using Figma. I focus on creating intuitive user journeys and pixel-perfect interfaces.',
    packages: {
      basic: {
        title: 'Wireframes Only',
        description: 'Low-fidelity wireframes for up to 5 app screens.',
        deliveryDays: 2,
        revisions: 2,
        price: 50,
        features: ['5 Screens', 'Wireframes', 'User Flow']
      },
      standard: {
        title: 'Pro UI Design',
        description: 'High-fidelity UI design for up to 5 screens with source file.',
        deliveryDays: 5,
        revisions: 3,
        price: 150,
        features: ['5 Screens', 'High-Fidelity UI', 'Source File (Figma)', 'Interactive Prototype']
      },
      premium: {
        title: 'Complete App Design',
        description: 'Full app design (up to 15 screens) with design system.',
        deliveryDays: 10,
        revisions: 'Unlimited',
        price: 400,
        features: ['15 Screens', 'High-Fidelity UI', 'Design System', 'Interactive Prototype', 'Source File']
      }
    }
  },
  {
    id: 's3',
    workerId: 'mock-worker-3',
    workerName: 'Mike Editor',
    workerAvatar: '',
    rating: 4.8,
    reviewsCount: 89,
    level: 'Level 1 Seller',
    title: 'I will professionally edit your YouTube or TikTok videos',
    category: 'Video Editing',
    coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&auto=format&fit=crop',
    description: 'High-quality, engaging video editing for content creators. I specialize in fast-paced edits, motion graphics, and color grading to make your videos stand out.',
    packages: {
      basic: {
        title: 'Short Form (TikTok/Reels)',
        description: 'Edit up to 60 seconds of vertical video with captions.',
        deliveryDays: 1,
        revisions: 1,
        price: 25,
        features: ['Up to 60s', 'Subtitles/Captions', 'Color Grading']
      },
      standard: {
        title: 'Standard YouTube Edit',
        description: 'Edit up to 10 minutes of footage into a cohesive video.',
        deliveryDays: 3,
        revisions: 2,
        price: 75,
        features: ['Up to 10 mins', 'Color Grading', 'Sound Design', 'Motion Graphics']
      },
      premium: {
        title: 'Cinematic Masterpiece',
        description: 'Edit up to 20 minutes with advanced effects and animations.',
        deliveryDays: 5,
        revisions: 4,
        price: 150,
        features: ['Up to 20 mins', 'Advanced VFX', 'Pro Sound Mix', 'Color Grading', 'Thumbnail included']
      }
    }
  },
  {
    id: 's4',
    workerId: 'mock-worker-4',
    workerName: 'AI Prompts Pro',
    workerAvatar: '',
    rating: 4.9,
    reviewsCount: 56,
    level: 'Top Rated ⭐',
    title: 'I will craft advanced Midjourney & ChatGPT prompts',
    category: 'AI Services',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop',
    description: 'Unlock the full potential of AI. I will engineer specific, highly optimized prompts for ChatGPT, Midjourney, or Stable Diffusion tailored to your exact business needs.',
    packages: {
      basic: {
        title: '5 Custom Prompts',
        description: '5 tailored prompts for your specific use case.',
        deliveryDays: 1,
        revisions: 1,
        price: 20,
        features: ['5 Prompts', 'Instruction Guide']
      },
      standard: {
        title: 'Prompt Engineering Guide',
        description: '15 custom prompts + a mini-guide on how to tweak them.',
        deliveryDays: 2,
        revisions: 2,
        price: 50,
        features: ['15 Prompts', 'Mini-Guide', 'Use-Case Analysis']
      },
      premium: {
        title: 'Complete Workflow Automation',
        description: 'A comprehensive set of chained prompts to automate a business process.',
        deliveryDays: 4,
        revisions: 3,
        price: 120,
        features: ['Unlimited Prompts', 'Workflow Setup', '1-on-1 Consultation', 'Documentation']
      }
    }
  }
];

export const useServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setServices(JSON.parse(saved));
    } else {
      setServices(initialMockServices);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockServices));
    }
  }, []);

  const saveServices = (newServices) => {
    setServices(newServices);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newServices));
  };

  const addService = (serviceData) => {
    const newService = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...serviceData
    };
    saveServices([newService, ...services]);
    return newService;
  };

  const deleteService = (serviceId) => {
    const updated = services.filter(s => s.id !== serviceId);
    saveServices(updated);
  };

  return { services, addService, deleteService };
};
