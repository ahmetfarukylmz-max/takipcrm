import React, { useState, useRef } from 'react';
import DocumentPreview from './DocumentPreview';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PdfGenerator = ({ doc, customers, products }) => {
    const [logo, setLogo] = useState(null);
    const [themeColor, setThemeColor] = useState('#3b82f6');
    const [showProductDescriptions, setShowProductDescriptions] = useState(true);
    const [showUnitPrices, setShowUnitPrices] = useState(true);
    const [showVatDetails, setShowVatDetails] = useState(true);
    const [customNotes, setCustomNotes] = useState('');
    const previewRef = useRef();

    const handleDownloadPdf = () => {
        const input = previewRef.current;
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const ratio = canvasWidth / canvasHeight;
            const width = pdfWidth;
            const height = width / ratio;

            if (height > pdfHeight) {
                // content is larger than one page
                const pageHeight = pdfHeight - 20; // with some margin
                let position = 0;
                let page = 1;
                while (position < canvasHeight) {
                    const pageCanvas = document.createElement('canvas');
                    pageCanvas.width = canvasWidth;
                    pageCanvas.height = pageHeight;
                    const pageCtx = pageCanvas.getContext('2d');
                    pageCtx.drawImage(canvas, 0, position, canvasWidth, pageHeight, 0, 0, canvasWidth, pageHeight);
                    const pageImgData = pageCanvas.toDataURL('image/png');

                    if (page > 1) {
                        pdf.addPage();
                    }
                    pdf.addImage(pageImgData, 'PNG', 5, 5, pdfWidth - 10, 0);
                    position += pageHeight;
                    page++;
                }
            } else {
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, 0);
            }

            pdf.save(`document-${doc.id}.pdf`);
        });
    };

    // TODO: Fetch data based on the ID (from quotes or orders)

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Belge Hazırlama Ekranı (ID: {doc.id})
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Control Panel */}
                <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Özelleştirme Seçenekleri
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Logo Yükle</label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => setLogo(URL.createObjectURL(e.target.files[0]))} 
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tema Rengi</label>
                            <input 
                                type="color" 
                                value={themeColor} 
                                onChange={(e) => setThemeColor(e.target.value)} 
                                className="w-full h-10 p-1 border-gray-300 dark:border-gray-600 rounded-md"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">İçerik Seçenekleri</label>
                            <div className="space-y-2">
                                <label className="flex items-center">
                                    <input type="checkbox" checked={showProductDescriptions} onChange={() => setShowProductDescriptions(!showProductDescriptions)} className="rounded" />
                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Ürün Açıklamalarını Göster</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" checked={showUnitPrices} onChange={() => setShowUnitPrices(!showUnitPrices)} className="rounded" />
                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Birim Fiyatları Göster</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" checked={showVatDetails} onChange={() => setShowVatDetails(!showVatDetails)} className="rounded" />
                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">KDV Detaylarını Göster</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Özel Notlar</label>
                            <textarea 
                                value={customNotes} 
                                onChange={(e) => setCustomNotes(e.target.value)} 
                                rows="4" 
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"></textarea>
                        </div>
                    </div>
                </div>

                {/* Right Side: Live Preview */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Canlı Önizleme
                    </h2>
                    <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-full overflow-auto">
                        <DocumentPreview 
                            ref={previewRef} 
                            doc={doc} 
                            logo={logo} 
                            themeColor={themeColor} 
                            showProductDescriptions={showProductDescriptions} 
                            showUnitPrices={showUnitPrices} 
                            showVatDetails={showVatDetails} 
                            customNotes={customNotes}
                            customers={customers}
                            products={products}
                        />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleDownloadPdf}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            PDF'i İndir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PdfGenerator;
