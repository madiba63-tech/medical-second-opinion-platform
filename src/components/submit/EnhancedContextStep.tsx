'use client';

import { useState } from 'react';
import QuestionnaireChoice from './QuestionnaireChoice';
import ShortQuestionnaire from './ShortQuestionnaire';
import DetailedQuestionnaire from './DetailedQuestionnaire';

interface EnhancedContextStepProps {
  context: any;
  onUpdate: (context: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function EnhancedContextStep({ context, onUpdate, onNext, onPrev }: EnhancedContextStepProps) {
  const [currentSubStep, setCurrentSubStep] = useState(
    context?.questionnaireType ? (context.questionnaireType === 'short' ? 2 : 3) : 1
  );
  
  const [questionnaireType, setQuestionnaireType] = useState<'short' | 'detailed' | null>(
    context?.questionnaireType || null
  );

  const handleQuestionnaireChoice = (type: 'short' | 'detailed') => {
    setQuestionnaireType(type);
    const updatedContext = { ...context, questionnaireType: type };
    onUpdate(updatedContext);
    setCurrentSubStep(type === 'short' ? 2 : 3);
  };

  const handleQuestionnaireUpdate = (data: any) => {
    const updatedContext = { ...context, ...data, questionnaireType };
    onUpdate(updatedContext);
  };

  const handleBackFromQuestionnaire = () => {
    setCurrentSubStep(1);
  };

  return (
    <>
      {currentSubStep === 1 && (
        <QuestionnaireChoice onChoice={handleQuestionnaireChoice} />
      )}
      
      {currentSubStep === 2 && questionnaireType === 'short' && (
        <ShortQuestionnaire
          onUpdate={handleQuestionnaireUpdate}
          onNext={onNext}
          onPrev={handleBackFromQuestionnaire}
          initialData={context}
        />
      )}
      
      {currentSubStep === 3 && questionnaireType === 'detailed' && (
        <DetailedQuestionnaire
          onUpdate={handleQuestionnaireUpdate}
          onNext={onNext}
          onPrev={handleBackFromQuestionnaire}
          initialData={context}
        />
      )}
    </>
  );
}