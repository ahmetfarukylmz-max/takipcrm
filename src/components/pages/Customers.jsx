import React, { useState, useMemo } from 'react';
import Modal from '../common/Modal';
import CustomerForm from '../forms/CustomerForm';
import SearchBar from '../common/SearchBar';
import { PlusIcon } from '../icons';
import { exportCustomersToCSV } from '../../utils/exportUtils';

const Customers = ({ customers, onSave }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleOpenModal = (customer = null) => {
        setCurrentCustomer(customer);
        setIsModalOpen(true);
    };

    const handleSave = (customerData) => {
        onSave(customerData);
        setIsModalOpen(false);
    };

    const handleExport = () => {
        exportCustomersToCSV(filteredCustomers);
    };

    // Filter customers based on search query
    const filteredCustomers = useMemo(() => {
        if (!searchQuery.trim()) return customers;

        const query = searchQuery.toLowerCase();
        return customers.filter(customer =>
            customer.name?.toLowerCase().includes(query) ||
            customer.contact_person?.toLowerCase().includes(query) ||
            customer.phone?.toLowerCase().includes(query) ||
            customer.email?.toLowerCase().includes(query)
        );
    }, [customers, searchQuery]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Müşteri Yönetimi</h1>
                <div className="flex gap-3">
                    <button
                        onClick={handleExport}
                        className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Dışa Aktar
                    </button>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        <PlusIcon />
                        Yeni Müşteri
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <SearchBar
                    placeholder="Müşteri ara (ad, yetkili, telefon, e-posta)..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                />
            </div>

            <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                {filteredCustomers.length} müşteri gösteriliyor
                {searchQuery && ` (${customers.length} toplam)`}
            </div>

            <div className="overflow-auto rounded-lg shadow bg-white dark:bg-gray-800">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700 border-b-2 border-gray-200 dark:border-gray-600">
                        <tr>
                            {['Müşteri Adı', 'Yetkili Kişi', 'Telefon', 'E-posta', 'İşlemler'].map(head => (
                                <th key={head} className="p-3 text-sm font-semibold tracking-wide text-left text-gray-700 dark:text-gray-300">
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {filteredCustomers.length > 0 ? (
                            filteredCustomers.map(customer => (
                                <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300 font-bold">{customer.name}</td>
                                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">{customer.contact_person}</td>
                                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">{customer.phone}</td>
                                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">{customer.email}</td>
                                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                                        <button
                                            onClick={() => handleOpenModal(customer)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Düzenle
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-gray-500 dark:text-gray-400">
                                    {searchQuery ? 'Arama kriterlerine uygun müşteri bulunamadı.' : 'Henüz müşteri eklenmemiş.'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Modal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentCustomer ? 'Müşteri Düzenle' : 'Yeni Müşteri Ekle'}
            >
                <CustomerForm
                    customer={currentCustomer}
                    onSave={handleSave}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default Customers;
