import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Wheat, Carrot, Beef, Fish, Coffee } from 'lucide-react';

interface CategoryTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const tabs = [
    { id: 'all', label: 'All', icon: null },
    { id: 'pantry', label: 'Pantry', icon: Wheat },
    { id: 'vegetables', label: 'Vegetables', icon: Carrot },
    { id: 'meat', label: 'Meat & Chicken', icon: Beef },
    { id: 'seafood', label: 'Seafood', icon: Fish },
    { id: 'snacks', label: 'Snacks', icon: Coffee },
];

const CategoryTabs = ({ activeTab, setActiveTab }: CategoryTabsProps) => {
    return (
        <div className="bg-white sticky top-[60px] md:top-[132px] z-30 shadow-sm border-b border-border mb-8 overflow-x-auto scrollbar-hide">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-6 min-w-max">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-2 py-4 border-b-2 text-sm font-bold transition-all",
                                activeTab === tab.id
                                    ? "border-primary text-primary"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {tab.icon && <tab.icon className="w-4 h-4" />}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryTabs;
