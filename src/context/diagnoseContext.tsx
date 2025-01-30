import { createContext, useContext, useState, ReactNode } from 'react';

interface DiagnoseData {
  allProbabilities: Record<string, number>; // Store all diseases with probabilities
  highestProbability: number;
  mostLikelyDisease: string;
}

interface DiagnoseContextType {
  diagnoseData: DiagnoseData | null;
  setDiagnoseData: (data: DiagnoseData) => void;
}

const DiagnoseContext = createContext<DiagnoseContextType | undefined>(undefined);

export const DiagnoseProvider = ({ children }: { children: ReactNode }) => {
  const [diagnoseData, setDiagnoseData] = useState<DiagnoseData | null>(null);

  return <DiagnoseContext.Provider value={{ diagnoseData, setDiagnoseData }}>{children}</DiagnoseContext.Provider>;
};

export const useDiagnose = () => {
  const context = useContext(DiagnoseContext);
  if (!context) {
    throw new Error('useDiagnose must be used within a DiagnoseProvider');
  }
  return context;
};
