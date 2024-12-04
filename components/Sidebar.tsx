import { Button } from './ui/index';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  CreditCard,
  Users,
  Package,
  FileText,
  PlusCircle,
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: () => void;
}

export function Sidebar({
  activeSection,
  setActiveSection,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const navItems = [
    { id: 'company', label: 'Company', icon: Home },
    { id: 'bank', label: 'Bank Accounts', icon: CreditCard },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'createInvoice', label: 'Create Invoice', icon: PlusCircle },
  ];

  return (
    <aside
      className={`bg-gray-800 text-white transition-all duration-1000 ${
        sidebarOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center p-4">
          {sidebarOpen && <h2 className="text-xl font-bold overflow-x-hidden text-nowrap mr-auto">Invoice App</h2>}
          <Button
            variant="ghost"
            size="icon"
            onClick={setSidebarOpen}
            className="text-white hover:bg-gray-700"
          >
            {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2 p-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant={activeSection === item.id ? 'secondary' : 'ghost'}
                  className={`w-full justify-start ${
                    sidebarOpen ? 'px-4' : 'px-2'
                  }`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <item.icon
                    className={`h-5 w-5 ${sidebarOpen ? 'mr-2' : 'mx-auto'}`}
                  />
                  {sidebarOpen && <span>{item.label}</span>}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
