// Modern PDF Export Function - AutoTable ile
export const generateModernPDF = (data) => {
    const { pdf, pageWidth, todayData, yesterdayData, conversionRate, yesterdayConversionRate, selectedDate, getCustomerName, getProductName, orders, formatCurrency, formatDate } = data;

    const margin = 15;
    let yPosition = margin;

    // ===== HEADER =====
    pdf.setFillColor(37, 99, 235);
    pdf.rect(0, 0, pageWidth, 40, 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('AKCELIK METAL SANAYI', 15, 15);

    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Organize Sanayi Bolgesi, Bursa | Tel: 0224 123 45 67', 15, 23);

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('GUNLUK PERFORMANS RAPORU', pageWidth - 15, 15, null, null, 'right');

    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(formatDate(selectedDate), pageWidth - 15, 23, null, null, 'right');

    yPosition = 50;

    // ===== PERFORMANS METRİKLERİ (AutoTable ile) =====
    pdf.setTextColor(30, 64, 175);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PERFORMANS METRIKLERI', margin, yPosition);
    yPosition += 3;

    const metricsData = [
        [
            `Musteri Gorusmeleri\n${todayData.stats.newMeetings} adet\nDun: ${yesterdayData.stats.newMeetings}`,
            `Olusturulan Teklifler\n${todayData.stats.newQuotes} adet\n${formatCurrency(todayData.stats.newQuotesValue)}`
        ],
        [
            `Onaylanan Siparisler\n${todayData.stats.convertedOrders} adet\n${formatCurrency(todayData.stats.convertedOrdersValue)}`,
            `Donusum Orani\n${conversionRate}%\nDun: ${yesterdayConversionRate}%`
        ]
    ];

    pdf.autoTable({
        startY: yPosition,
        body: metricsData,
        theme: 'plain',
        styles: {
            fontSize: 10,
            cellPadding: 8,
            lineColor: [226, 232, 240],
            lineWidth: 0.1,
            halign: 'center',
            valign: 'middle'
        },
        columnStyles: {
            0: { fillColor: [239, 246, 255], textColor: [30, 64, 175], fontStyle: 'bold' },
            1: { fillColor: [243, 244, 246], textColor: [30, 64, 175], fontStyle: 'bold' }
        },
        margin: { left: margin, right: margin }
    });

    yPosition = pdf.lastAutoTable.finalY + 15;

    // ===== MÜŞTERI GÖRÜŞMELERİ =====
    if (todayData.meetings && todayData.meetings.length > 0) {
        pdf.setTextColor(30, 64, 175);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`MUSTERI GORUSMELERI (${todayData.meetings.length})`, margin, yPosition);

        const meetingsRows = todayData.meetings.map(meeting => [
            getCustomerName(meeting.customerId),
            formatDate(meeting.date),
            meeting.notes || meeting.outcome || '-'
        ]);

        pdf.autoTable({
            startY: yPosition + 2,
            head: [['Musteri Adi', 'Tarih', 'Notlar / Sonuc']],
            body: meetingsRows,
            theme: 'grid',
            headStyles: {
                fillColor: [59, 130, 246],
                textColor: [255, 255, 255],
                fontSize: 9,
                fontStyle: 'bold',
                halign: 'left'
            },
            styles: {
                fontSize: 8,
                cellPadding: 4
            },
            columnStyles: {
                0: { cellWidth: 50 },
                1: { cellWidth: 30 },
                2: { cellWidth: 'auto' }
            },
            margin: { left: margin, right: margin }
        });

        yPosition = pdf.lastAutoTable.finalY + 10;
    }

    // ===== OLUŞTURULAN TEKLİFLER =====
    if (todayData.quotes && todayData.quotes.length > 0) {
        pdf.setTextColor(30, 64, 175);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`OLUSTURULAN TEKLIFLER (${todayData.quotes.length})`, margin, yPosition);

        todayData.quotes.forEach((quote, idx) => {
            const quotesRows = [[
                `Teklif #${idx + 1}`,
                getCustomerName(quote.customerId),
                formatDate(quote.teklif_tarihi),
                quote.status || 'Bekliyor',
                formatCurrency(quote.total_amount)
            ]];

            pdf.autoTable({
                startY: yPosition + 2,
                body: quotesRows,
                theme: 'plain',
                styles: {
                    fontSize: 9,
                    cellPadding: 4,
                    fillColor: [250, 245, 255],
                    textColor: [0, 0, 0]
                },
                columnStyles: {
                    0: { fontStyle: 'bold', cellWidth: 25 },
                    1: { cellWidth: 'auto' },
                    2: { cellWidth: 30 },
                    3: { cellWidth: 30 },
                    4: { halign: 'right', fontStyle: 'bold', textColor: [168, 85, 247], cellWidth: 35 }
                },
                margin: { left: margin, right: margin }
            });

            // Ürünler
            if (quote.items && quote.items.length > 0) {
                const itemRows = quote.items.slice(0, 5).map(item => [
                    getProductName(item.productId),
                    `${item.quantity} ${item.unit || 'Kg'}`,
                    formatCurrency(item.quantity * item.unit_price)
                ]);

                pdf.autoTable({
                    startY: pdf.lastAutoTable.finalY,
                    head: [['Urun', 'Miktar', 'Tutar']],
                    body: itemRows,
                    theme: 'plain',
                    headStyles: {
                        fillColor: [248, 250, 252],
                        textColor: [71, 85, 105],
                        fontSize: 7,
                        fontStyle: 'bold'
                    },
                    styles: {
                        fontSize: 7,
                        cellPadding: 3
                    },
                    columnStyles: {
                        0: { cellWidth: 'auto' },
                        1: { cellWidth: 30 },
                        2: { halign: 'right', cellWidth: 35 }
                    },
                    margin: { left: margin + 5, right: margin + 5 }
                });

                if (quote.items.length > 5) {
                    pdf.setFontSize(7);
                    pdf.setTextColor(100, 116, 139);
                    pdf.text(`+ ${quote.items.length - 5} urun daha`, margin + 8, pdf.lastAutoTable.finalY + 3);
                }
            }

            yPosition = pdf.lastAutoTable.finalY + 6;
        });

        yPosition += 5;
    }

    // ===== ONAYLANAN SİPARİŞLER =====
    if (todayData.allOrders && todayData.allOrders.length > 0) {
        pdf.setTextColor(30, 64, 175);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`ONAYLANAN SIPARISLER (${todayData.allOrders.length})`, margin, yPosition);

        todayData.allOrders.forEach((order, idx) => {
            const orderRows = [[
                `Siparis #${idx + 1}`,
                getCustomerName(order.customerId),
                formatDate(order.order_date),
                order.quoteId ? '✓ Tekliften' : (order.status || 'Bekliyor'),
                formatCurrency(order.total_amount)
            ]];

            pdf.autoTable({
                startY: yPosition + 2,
                body: orderRows,
                theme: 'plain',
                styles: {
                    fontSize: 9,
                    cellPadding: 4,
                    fillColor: [240, 253, 244],
                    textColor: [0, 0, 0]
                },
                columnStyles: {
                    0: { fontStyle: 'bold', cellWidth: 25 },
                    1: { cellWidth: 'auto' },
                    2: { cellWidth: 30 },
                    3: { cellWidth: 30 },
                    4: { halign: 'right', fontStyle: 'bold', textColor: [34, 197, 94], cellWidth: 35 }
                },
                margin: { left: margin, right: margin }
            });

            // Ürünler
            if (order.items && order.items.length > 0) {
                const itemRows = order.items.slice(0, 5).map(item => [
                    getProductName(item.productId),
                    `${item.quantity} ${item.unit || 'Kg'}`,
                    formatCurrency(item.quantity * item.unit_price)
                ]);

                pdf.autoTable({
                    startY: pdf.lastAutoTable.finalY,
                    head: [['Urun', 'Miktar', 'Tutar']],
                    body: itemRows,
                    theme: 'plain',
                    headStyles: {
                        fillColor: [248, 250, 252],
                        textColor: [71, 85, 105],
                        fontSize: 7,
                        fontStyle: 'bold'
                    },
                    styles: {
                        fontSize: 7,
                        cellPadding: 3
                    },
                    columnStyles: {
                        0: { cellWidth: 'auto' },
                        1: { cellWidth: 30 },
                        2: { halign: 'right', cellWidth: 35 }
                    },
                    margin: { left: margin + 5, right: margin + 5 }
                });

                if (order.items.length > 5) {
                    pdf.setFontSize(7);
                    pdf.setTextColor(100, 116, 139);
                    pdf.text(`+ ${order.items.length - 5} urun daha`, margin + 8, pdf.lastAutoTable.finalY + 3);
                }
            }

            yPosition = pdf.lastAutoTable.finalY + 6;
        });

        yPosition += 5;
    }

    // ===== SEVKİYATLAR =====
    if (todayData.shipments && todayData.shipments.length > 0) {
        pdf.setTextColor(30, 64, 175);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`OLUSTURULAN SEVKIYATLAR (${todayData.shipments.length})`, margin, yPosition);

        const shipmentRows = todayData.shipments.map(shipment => {
            const relatedOrder = orders.find(o => o.id === shipment.orderId);
            const customerName = relatedOrder ? getCustomerName(relatedOrder.customerId) : 'Bilinmiyor';

            return [
                customerName,
                formatDate(shipment.shipment_date),
                shipment.status,
                shipment.delivery_date ? formatDate(shipment.delivery_date) : '-'
            ];
        });

        pdf.autoTable({
            startY: yPosition + 2,
            head: [['Musteri', 'Sevkiyat Tarihi', 'Durum', 'Teslimat']],
            body: shipmentRows,
            theme: 'grid',
            headStyles: {
                fillColor: [251, 146, 60],
                textColor: [255, 255, 255],
                fontSize: 9,
                fontStyle: 'bold',
                halign: 'left'
            },
            styles: {
                fontSize: 8,
                cellPadding: 4
            },
            columnStyles: {
                0: { cellWidth: 50 },
                1: { cellWidth: 35 },
                2: { cellWidth: 30 },
                3: { cellWidth: 'auto' }
            },
            margin: { left: margin, right: margin }
        });

        yPosition = pdf.lastAutoTable.finalY + 10;
    }

    // ===== FOOTER ÖZETİ =====
    pdf.setFillColor(37, 99, 235);
    pdf.rect(margin, yPosition, pageWidth - (margin * 2), 8, 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text('GUNLUK PERFORMANS OZETI', pageWidth / 2, yPosition + 6, null, null, 'center');

    const summaryData = [[
        `Gelir Potansiyeli\n${formatCurrency(todayData.stats.newQuotesValue)}\n${todayData.stats.newQuotes} Teklif`,
        `Gerceklesen Gelir\n${formatCurrency(todayData.stats.allOrdersValue)}\n${todayData.stats.allOrders} Siparis`,
        `Basari Orani\n${conversionRate}%\n${todayData.stats.convertedOrders}/${todayData.stats.newQuotes} Onaylandi`
    ]];

    pdf.autoTable({
        startY: yPosition + 10,
        body: summaryData,
        theme: 'plain',
        styles: {
            fontSize: 9,
            cellPadding: 6,
            halign: 'center',
            valign: 'middle',
            lineColor: [226, 232, 240],
            lineWidth: 0.1
        },
        columnStyles: {
            0: { fillColor: [243, 232, 255], textColor: [30, 64, 175], fontStyle: 'bold' },
            1: { fillColor: [220, 252, 231], textColor: [30, 64, 175], fontStyle: 'bold' },
            2: { fillColor: [255, 237, 213], textColor: [30, 64, 175], fontStyle: 'bold' }
        },
        margin: { left: margin, right: margin }
    });

    return pdf;
};
