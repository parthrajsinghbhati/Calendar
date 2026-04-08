
import { format } from 'date-fns';
import { cn } from '../../utils/cn';

interface HeroImageProps {
  currentDate: Date;
  className?: string;
}

export const HeroImage = ({ currentDate, className }: HeroImageProps) => {
  const activeMonthIndex = currentDate.getMonth();
  
  const monthImages = [
    "https://images.unsplash.com/photo-1478719059408-592965723cbc?auto=format&fit=crop&q=80&w=2000", 
    "https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?auto=format&fit=crop&q=80&w=2000", 
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2000", 
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=2000", 
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000", 
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000", 
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=2000", 
    "https://images.unsplash.com/photo-1506744626753-1fa7604ed229?auto=format&fit=crop&q=80&w=2000", 
    "https://images.unsplash.com/photo-1440688807730-73e4e2169fb8?auto=format&fit=crop&q=80&w=2000", 
    "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=2000", 
    "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=2000", 
    "https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&q=80&w=2000" 
  ];

  return (
    <div className={cn("relative w-full overflow-hidden flex-none", className)}>
      <div 
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{
          backgroundImage: `url(${monthImages[activeMonthIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label={`Image for ${format(currentDate, 'MMMM')}`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="absolute -bottom-px left-0 w-full h-24 pointer-events-none">
        <svg preserveAspectRatio="none" viewBox="0 0 100 100" className="w-full h-full relative z-10">
           <polygon points="25,100 50,20 100,100" className="fill-white dark:fill-slate-900" />
           <polygon points="0,100 0,50 30,100" className="fill-blue-500 dark:fill-blue-600" />
           <polygon points="100,100 100,0 70,100" className="fill-blue-500 dark:fill-blue-600" />
        </svg>
      </div>
    </div>
  );
};
