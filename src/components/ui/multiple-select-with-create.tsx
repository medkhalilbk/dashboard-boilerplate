'use client';
import React from 'react';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector'; 

const OPTIONS: Option[] = [
  { label: 'Turc', value: 'Turc',  },
  { label: 'Cozy', value: 'Traditionel', },
  { label: 'Traditionelle', value: 'Traditionel' }, 
];

const mockSearch = async (value: string): Promise<Option[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = OPTIONS.filter((option) => option.value.includes(value));
      resolve(res);
    }, 1000);
  });
};

const MultipleSelectorWithAsyncSearchAndCreatableAndGroup = ({onChange}: {onChange: () => void}) => {
  const [isTriggered, setIsTriggered] = React.useState(false);
  return (
    <div className="flex w-full flex-col gap-5 px-10">
      
      <MultipleSelector
        
        onSearch={async (value) => {
          setIsTriggered(true);
          const res = await mockSearch(value);
          setIsTriggered(false);
          return res;
        }}
        defaultOptions={[]}
        creatable
        onChange={(data:any) => {
          console.log(data)
        }} 
        placeholder="Rechercher les mots clés"
        loadingIndicator={
          <p className="py-2 text-center text-lg leading-10 text-muted-foreground">Chargement...</p>
        }
        emptyIndicator={
          <p className="w-full text-center text-lg leading-10 text-muted-foreground">
            Aucun résultat trouvé
          </p>
        }
      />
    </div>
  );
};

export default MultipleSelectorWithAsyncSearchAndCreatableAndGroup;
