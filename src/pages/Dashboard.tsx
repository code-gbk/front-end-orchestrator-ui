
import { useState } from 'react';
import { VideoUpload } from '@/components/dashboard/VideoUpload';
import { ModelSelection } from '@/components/dashboard/ModelSelection';
import { ProcessingStatus } from '@/components/dashboard/ProcessingStatus';
import { Navbar } from '@/components/layout/Navbar';

type Step = 'upload' | 'model' | 'processing';

const Dashboard = () => {
  const [currentStep, setCurrentStep] = useState<Step>('upload');

  const handleNext = () => {
    if (currentStep === 'upload') {
      setCurrentStep('model');
    } else if (currentStep === 'model') {
      setCurrentStep('processing');
    }
  };

  const handleBack = () => {
    if (currentStep === 'model') {
      setCurrentStep('upload');
    } else if (currentStep === 'processing') {
      setCurrentStep('model');
    }
  };

  const handleReset = () => {
    setCurrentStep('upload');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'upload':
        return <VideoUpload onNext={handleNext} />;
      case 'model':
        return <ModelSelection onNext={handleNext} onBack={handleBack} />;
      case 'processing':
        return <ProcessingStatus onReset={handleReset} />;
      default:
        return <VideoUpload onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
