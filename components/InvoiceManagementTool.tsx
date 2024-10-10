'use client';

import { Provider } from 'react-redux';
import { store } from '../hold/store';
import { Sidebar } from './Sidebar';
import { CompanyDetails } from './CompanyDetails';
import { BankAccounts } from './BankAccounts';
import { ClientDetails } from './ClientDetails';
import { Products } from './Products';
import { InvoiceList } from './InvoiceList';
import { CreateInvoice } from './CreateInvoice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../hold/store';
import { setActiveSection, toggleSidebar } from '../slices/uiSlice';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense, useEffect } from 'react';

function ErrorFallback({ error }: { error: Error }) {
    return (
        <div className="text-red-500 p-4">
            <h2>Oops! Something went wrong:</h2>
            <pre>{error.message}</pre>
        </div>
    );
}

function Loading() {
    return <div className="text-center p-4">Loading...</div>;
}

function InvoiceManagementContent() {
    const dispatch = useDispatch();
    const ui = useSelector((state: RootState) => state.ui);

    useEffect(() => {
        console.log('UI State:', ui);
    }, [ui]);

    if (!ui) {
        return <div className="text-center p-4">Loading UI state...</div>;
    }

    const activeSection = ui.activeSection || 'company';
    const sidebarOpen = ui.sidebarOpen ?? true;

    const renderActiveSection = () => {
        switch (activeSection) {
            case 'company':
                return <CompanyDetails />;
            case 'bank':
                return <BankAccounts />;
            case 'clients':
                return <ClientDetails />;
            case 'products':
                return <Products />;
            case 'invoices':
                return <InvoiceList />;
            case 'createInvoice':
                return <CreateInvoice />;
            default:
                return <CompanyDetails />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar
                activeSection={activeSection}
                setActiveSection={(section: string) =>
                    dispatch(setActiveSection(section))
                }
                sidebarOpen={sidebarOpen}
                setSidebarOpen={() => dispatch(toggleSidebar())}
            />
            <main
                className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'
                    }`}
            >
                <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 sm:p-8 md:p-10">
                            <h1 className="text-3xl font-bold mb-6 text-black">
                                Invoice Management Tool
                            </h1>
                            <ErrorBoundary FallbackComponent={ErrorFallback}>
                                <Suspense fallback={<Loading />}>
                                    <div className="mt-6">{renderActiveSection()}</div>
                                </Suspense>
                            </ErrorBoundary>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function InvoiceManagementTool() {
    return (
        <Provider store={store}>
            <InvoiceManagementContent />
        </Provider>
    );
}
