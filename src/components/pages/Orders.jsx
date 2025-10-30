import React, { useState, useMemo } from 'react';
import Modal from '../common/Modal';
import OrderForm from '../forms/OrderForm';
import SearchBar from '../common/SearchBar';
import { PlusIcon } from '../icons';
import { formatDate, formatCurrency, getStatusClass } from '../../utils/formatters';
import { exportOrdersToCSV } from '../../utils/exportUtils';

const Orders = ({ orders, onSave, customers, products }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('Tümü');

    const handleOpenModal = (order = null) => {
        setCurrentOrder(order);
        setIsModalOpen(true);
    };

    const handleSave = (orderData) => {
        onSave(orderData);
        setIsModalOpen(false);
    };

    const handleExport = () => {
        exportOrdersToCSV(filteredOrders, customers);
    };

    // Filter orders based on search query and status
    const filteredOrders = useMemo(() => {
        let filtered = orders;

        // Status filter
        if (statusFilter !== 'Tümü') {
            filtered = filtered.filter(order => order.status === statusFilter);
        }

        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(order => {
                const customer = customers.find(c => c.id === order.customerId);
                return (
                    customer?.name?.toLowerCase().includes(query) ||
                    order.order_date?.toLowerCase().includes(query) ||
                    order.total_amount?.toString().includes(query)
                );
            });
        }

        return filtered;
    }, [orders, searchQuery, statusFilter, customers]);

    const statusOptions = ['Tümü', 'Bekliyor', 'Hazırlanıyor', 'Tamamlandı'];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Sipariş Yönetimi</h1>
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
                        Yeni Sipariş
                    </button>
                </div>
            </div>

            <div className="flex gap-4 mb-4">
                <div className="flex-1">
                    <SearchBar
                        placeholder="Sipariş ara (müşteri, tarih, tutar)..."
                        value={searchQuery}
                        onChange={setSearchQuery}
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                    {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>

            <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                {filteredOrders.length} sipariş gösteriliyor
                {(searchQuery || statusFilter !== 'Tümü') && ` (${orders.length} toplam)`}
            </div>

            <div className="overflow-auto rounded-lg shadow bg-white dark:bg-gray-800">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700 border-b-2 border-gray-200 dark:border-gray-600">
                        <tr>
                            {['Müşteri', 'Sipariş Tarihi', 'Toplam Tutar', 'Durum', 'İşlemler'].map(h => (
                                <th key={h} className="p-3 text-sm font-semibold tracking-wide text-left text-gray-700 dark:text-gray-300">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {filteredOrders.length > 0 ? filteredOrders.map(order => (
                            <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="p-3 text-sm text-gray-700 dark:text-gray-300 font-bold">
                                    {customers.find(c => c.id === order.customerId)?.name || 'Bilinmiyor'}
                                </td>
                                <td className="p-3 text-sm text-gray-700 dark:text-gray-300">{formatDate(order.order_date)}</td>
                                <td className="p-3 text-sm text-gray-700 dark:text-gray-300">{formatCurrency(order.total_amount)}</td>
                                <td className="p-3 text-sm">
                                    <span
                                        className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg ${getStatusClass(order.status)}`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                                    <button
                                        onClick={() => handleOpenModal(order)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Detay/Düzenle
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-gray-500 dark:text-gray-400">
                                    {searchQuery || statusFilter !== 'Tümü' ? 'Arama kriterlerine uygun sipariş bulunamadı.' : 'Henüz sipariş eklenmemiş.'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Modal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentOrder ? 'Sipariş Detayı' : 'Yeni Sipariş Oluştur'}
            >
                <OrderForm
                    order={currentOrder}
                    onSave={handleSave}
                    onCancel={() => setIsModalOpen(false)}
                    customers={customers}
                    products={products}
                />
            </Modal>
        </div>
    );
};

export default Orders;
