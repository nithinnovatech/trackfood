import { useNavigate } from 'react-router-dom';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from '@/components/ui/drawer';
import { RadioGroup } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface MobileCategoryFilterProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    activeCategory: string;
}

const categories = [
    { id: 'all', label: 'All', route: '/' },
    { id: 'pantry', label: 'Pantry', route: '/category/pantry' },
    { id: 'vegetables', label: 'Vegetables', route: '/category/vegetables' },
    { id: 'meat', label: 'Meat & Chicken', route: '/category/meat' },
    { id: 'seafood', label: 'Seafood', route: '/category/seafood' },
    { id: 'snacks', label: 'Snacks', route: '/category/snacks' },
];

const MobileCategoryFilter = ({ open, onOpenChange, activeCategory }: MobileCategoryFilterProps) => {
    const navigate = useNavigate();

    // Determine the selected value for RadioGroup
    const selectedValue = categories.find(c => c.id === activeCategory)?.id || 'all';

    const handleCategoryChange = (value: string) => {
        const category = categories.find((c) => c.id === value);
        if (category) {
            navigate(category.route);
            onOpenChange(false);
        }
    };

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="max-h-[85vh] rounded-t-[20px]">
                <DrawerHeader className="flex items-center justify-between border-b pb-4 px-5 pt-5">
                    <DrawerTitle className="text-xl font-bold">Filter by Category</DrawerTitle>
                    <DrawerClose asChild>
                        <button className="rounded-full p-1 hover:bg-muted/50">
                            <X className="h-5 w-5 opacity-70" />
                        </button>
                    </DrawerClose>
                </DrawerHeader>

                <div className="p-5 overflow-y-auto">
                    <RadioGroup
                        value={selectedValue}
                        onValueChange={handleCategoryChange}
                        className="gap-3"
                    >
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className={`flex items-center space-x-3 p-4 rounded-xl border transition-colors cursor-pointer ${selectedValue === category.id
                                        ? 'bg-[#FFC629] border-[#FFC629] text-black shadow-sm'
                                        : 'bg-white border-gray-100 hover:bg-gray-50'
                                    }`}
                                onClick={() => handleCategoryChange(category.id)}
                            >
                                <div className={`flex items-center justify-center h-5 w-5 rounded-full border ${selectedValue === category.id
                                        ? 'border-black bg-black text-white'
                                        : 'border-gray-400'
                                    }`}>
                                    {selectedValue === category.id && <div className="h-2 w-2 rounded-full bg-white" />}
                                </div>
                                <Label
                                    htmlFor={category.id}
                                    className={`flex-1 text-base font-semibold cursor-pointer ${selectedValue === category.id ? 'text-black' : 'text-gray-700'
                                        }`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {category.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default MobileCategoryFilter;
