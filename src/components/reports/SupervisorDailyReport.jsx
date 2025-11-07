import React, { useMemo } from 'react';
import { formatCurrency, isToday } from '../../utils/formatters';

const ReportRow = ({ label, value, subvalue }) => (
    <div className="flex justify-between items-baseline py-3 border-b border-gray-200 dark:border-gray-700">
        <span className="text-gray-600 dark:text-gray-400">{label}</span>
        <div className="text-right">
            <span className="font-semibold text-gray-900 dark:text-gray-100">{value}</span>
            {subvalue && <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">{subvalue}</span>}
        </div>
    </div>
);

const SupervisorDailyReport = ({ orders, quotes, meetings, shipments }) => {

    const report = useMemo(() => {
        const dailyReport = {
            newMeetings: 0,
            newQuotes: 0,
            newQuotesValue: 0,
            convertedOrders: 0,
            convertedOrdersValue: 0,
            newShipments: 0,
            completedDeliveries: 0,
        };

        meetings.forEach(meeting => {
            if (isToday(meeting.date)) {
                dailyReport.newMeetings++;
            }
        });

        quotes.forEach(quote => {
            if (isToday(quote.teklif_tarihi)) {
                dailyReport.newQuotes++;
                dailyReport.newQuotesValue += quote.total_amount || 0;
            }
        });

        orders.forEach(order => {
            if (isToday(order.order_date) && order.quoteId) {
                dailyReport.convertedOrders++;
                dailyReport.convertedOrdersValue += order.total_amount || 0;
            }
        });

        shipments.forEach(shipment => {
            if (isToday(shipment.shipment_date)) {
                dailyReport.newShipments++;
            }
            if (isToday(shipment.delivery_date)) {
                dailyReport.completedDeliveries++;
            }
        });

        return dailyReport;
    }, [orders, quotes, meetings, shipments]);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Günlük Performans Raporu</h3>
            
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Yeni Fırsatlar</h4>
                <div className="space-y-2">
                    <ReportRow label="Yeni Müşteri Görüşmesi" value={`${report.newMeetings} adet`} />
                    <ReportRow label="Oluşturulan Teklif Sayısı" value={`${report.newQuotes} adet`} subvalue={formatCurrency(report.newQuotesValue)} />
                </div>
            </div>

            <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Satış Performansı</h4>
                <div className="space-y-2">
                    <ReportRow label="Siparişe Dönen Teklif" value={`${report.convertedOrders} adet`} subvalue={formatCurrency(report.convertedOrdersValue)} />
                </div>
            </div>

            <div>
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Operasyon</h4>
                <div className="space-y-2">
                    <ReportRow label="Oluşturulan Sevkiyat" value={`${report.newShipments} adet`} />
                    <ReportRow label="Teslim Edilen Sipariş" value={`${report.completedDeliveries} adet`} />
                </div>
            </div>
        </div>
    );
};

export default SupervisorDailyReport;
