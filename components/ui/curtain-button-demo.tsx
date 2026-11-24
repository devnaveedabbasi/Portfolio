'use client';

import * as React from 'react';
import { CurtainButton } from '@/components/ui/curtain-button';

export function CurtainButtonShowcase() {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto p-4">
      {/* Section: Variants */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--text-muted)] font-mono">Variants</h4>
        <div className="flex flex-wrap gap-4">
          <CurtainButton text="Default" variant="default" />
          <CurtainButton text="Outline" variant="outline" />
          <CurtainButton text="Destructive" variant="destructive" />
          <CurtainButton text="Ghost" variant="ghost" />
        </div>
      </div>

      {/* Section: Sizes */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--text-muted)] font-mono">Sizes</h4>
        <div className="flex flex-wrap items-center gap-4">
          <CurtainButton text="Small" size="sm" />
          <CurtainButton text="Default" size="default" />
          <CurtainButton text="Large Button" size="lg" />
        </div>
      </div>

      {/* Section: States */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--text-muted)] font-mono">States</h4>
        <div className="flex flex-wrap gap-4">
          <CurtainButton text="Disabled" isDisabled />
          <CurtainButton
            text={isLoading ? "Saving..." : "Click to Load"}
            isLoading={isLoading}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}

export default CurtainButtonShowcase;
