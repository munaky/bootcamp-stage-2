import { ShoppingCart } from 'lucide-react';

const Header = ({ cartCounter }: any) => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="relative">
        <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartCounter}
          </span>
      </div>
    </header>
  );
};

export default Header;
