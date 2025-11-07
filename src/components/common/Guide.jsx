import React from 'react';

const Guide = () => {
    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">Detaylı Kullanıcı Rehberi</h2>
            <div className="space-y-8 text-gray-700 dark:text-gray-300">

                <div>
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3 border-b pb-2">Giriş</h3>
                    <p>Bu rehber, Takip CRM uygulamasının tüm özelliklerini etkin bir şekilde kullanmanıza yardımcı olmak için tasarlanmıştır. Uygulama, müşteri ilişkilerinizi, satışlarınızı ve operasyonlarınızı tek bir yerden yönetmenizi sağlar. Firebase altyapısı sayesinde tüm verileriniz anlık olarak güncellenir ve güvenli bir şekilde saklanır.</p>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3 border-b pb-2">1. Anasayfa (Dashboard)</h3>
                    <p>Anasayfa, işinizin anlık durumunu gösteren bir kontrol panelidir. Burada aşağıdaki kritik bilgilere hızlıca erişebilirsiniz:</p>
                    <ul className="list-disc list-inside mt-3 space-y-2 pl-4">
                        <li><strong>Genel Bakış Kartları:</strong> Toplam müşteri sayısı, açık siparişler, bekleyen teklifler, planlanan ve gecikmiş eylemler gibi önemli metriklere anında ulaşın.</li>
                        <li><strong>Yaklaşan Eylemler:</strong> Planladığınız müşteri görüşmeleri ve takip görevlerini listeleyerek hiçbir fırsatı kaçırmayın.</li>
                        <li><strong>Son Bekleyen Siparişler:</strong> Henüz tamamlanmamış siparişleri görüntüleyerek operasyonel süreçlerinizi yönetin.</li>
                        <li><strong>En Çok Satılan Ürünler:</strong> En popüler ürünlerinizi ve getirdikleri geliri görerek stok ve satış stratejilerinizi belirleyin.</li>
                        <li><strong>Yaklaşan Teslimatlar:</strong> Önümüzdeki 7 gün içinde yapılması gereken teslimatları takip edin.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3 border-b pb-2">2. Müşteriler</h3>
                    <p>Bu bölüm, müşteri portföyünüzü yönettiğiniz yerdir. Müşterilerle ilgili tüm bilgiler burada merkezileştirilmiştir.</p>
                    <ul className="list-disc list-inside mt-3 space-y-2 pl-4">
                        <li><strong>Yeni Müşteri Ekleme:</strong> "Yeni Müşteri" butonu ile müşteri profili (firma adı, yetkili, iletişim vb.) oluşturun.</li>
                        <li><strong>Akıllı Arama ve Filtreleme:</strong> Müşterilerinizi isme, yetkiliye, telefona veya e-postaya göre arayın. Ayrıca "Aktif" veya "Potansiyel" müşteri durumuna göre filtreleyin.</li>
                        <li><strong>Toplu İşlemler:</strong> Birden fazla müşteriyi seçerek toplu olarak silebilirsiniz.</li>
                        <li><strong>Müşteri Detay Sayfası:</strong> Bir müşteriye tıkladığınızda, o müşteriye ait tüm geçmişi (siparişler, teklifler, görüşmeler, sevkiyatlar), istatistikleri ve en çok aldığı ürünleri tek bir ekranda görün.</li>
                        <li><strong>Hızlı İşlemler:</strong> Müşteri listesinden direkt olarak müşteriyi düzenleyebilir, silebilir veya WhatsApp üzerinden mesaj gönderebilirsiniz.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3 border-b pb-2">3. Ürünler</h3>
                    <p>Sunduğunuz ürün veya hizmetleri yönetin. Bu bölüm, teklif ve sipariş oluştururken standart bir ürün kataloğu kullanmanızı sağlar.</p>
                    <ul className="list-disc list-inside mt-3 space-y-2 pl-4">
                        <li><strong>Ürün Ekleme/Düzenleme:</strong> Ürün adı, kodu, maliyet/satış fiyatı ve para birimi (TL/USD) gibi bilgileri girerek ürünlerinizi yönetin.</li>
                        <li><strong>Ürün Arama:</strong> Mevcut tüm ürünlerinizi isme veya koda göre hızlıca bulun.</li>
                        <li><strong>Toplu Silme:</strong> Birden fazla ürünü seçerek toplu olarak silebilirsiniz.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3 border-b pb-2">4. Teklifler</h3>
                    <p>Müşterilerinize sunduğunuz fiyat tekliflerini hazırlayın, gönderin ve takip edin.</p>
                    <ul className="list-disc list-inside mt-3 space-y-2 pl-4">
                        <li><strong>Dinamik Teklif Oluşturma:</strong> Müşteri ve ürün seçerek, miktarları, birim fiyatları ve KDV oranını belirleyerek anında teklif oluşturun.</li>
                        <li><strong>Teklif Durumları:</strong> Tekliflerinizi "Hazırlandı", "Onaylandı", "Reddedildi" gibi durumlarla takip edin. Reddedilen teklifler için nedenini not alabilirsiniz.</li>
                        <li><strong>Siparişe Dönüştürme:</strong> Onaylanan bir teklifi tek bir tıklama ile doğrudan bir siparişe dönüştürerek veri girişini azaltın ve süreci hızlandırın.</li>
                        <li><strong>PDF Çıktısı:</strong> Oluşturduğunuz teklifi standart veya özelleştirilmiş bir formatta PDF olarak indirip müşterinizle paylaşın.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3 border-b pb-2">5. Siparişler</h3>
                    <p>Müşteri siparişlerinizi baştan sona yönetin.</p>
                    <ul className="list-disc list-inside mt-3 space-y-2 pl-4">
                        <li><strong>Sipariş Oluşturma:</strong> Manuel olarak yeni bir sipariş oluşturabilir veya bir tekliften dönüştürebilirsiniz.</li>
                        <li><strong>Sipariş Takibi:</strong> Siparişlerinizi "Bekliyor", "Hazırlanıyor", "Tamamlandı" gibi aşamalarla takip edin.</li>
                        <li><strong>Sevkiyat Planlama:</strong> Bir sipariş için sevkiyat oluşturarak lojistik sürecini başlatın.</li>
                        <li><strong>PDF Çıktısı:</strong> Sipariş detaylarını içeren bir sipariş formunu standart veya özelleştirilmiş PDF olarak indirin.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3 border-b pb-2">6. Görüşmeler</h3>
                    <p>Müşteri etkileşimlerinizi kaydederek kurumsal hafızanızı güçlendirin ve satış fırsatlarını takip edin.</p>
                    <ul className="list-disc list-inside mt-3 space-y-2 pl-4">
                        <li><strong>Görüşme Kaydetme:</strong> Müşteri ile yapılan telefon görüşmesi, toplantı veya e-posta gibi etkileşimleri; durumu, türü, sonucu ve notlarıyla birlikte kaydedin.</li>
                        <li><strong>Gelecek Eylem Planlama:</strong> Bir sonraki adımı (örneğin, "Teklifi hatırlat") ve eylem tarihini belirleyerek gelecekteki görevler için hatırlatıcılar oluşturun. Anasayfadaki "Gecikmiş Eylemler" bölümü ile takibini kolaylaştırın.</li>
                        <li><strong>Filtreleme ve Sıralama:</strong> Görüşmeleri durum, tür, tarih veya müşteriye göre filtreleyip sıralayarak aradığınız kayda hızla ulaşın.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3 border-b pb-2">7. Sevkiyat</h3>
                    <p>Siparişlerin teslimat sürecini organize edin ve takip edin.</p>
                    <ul className="list-disc list-inside mt-3 space-y-2 pl-4">
                        <li><strong>Parçalı Sevkiyat:</strong> Bir siparişteki ürünlerin tamamını veya bir kısmını sevk edin. Sistem, kalan miktarı otomatik olarak takip eder.</li>
                        <li><strong>Durum Güncelleme:</strong> Sevkiyatın durumunu "Yolda" veya "Teslim Edildi" olarak güncelleyin.</li>
                        <li><strong>Teslimat Onayı:</strong> Teslim edilen ürünler için onay vererek ilgili siparişin durumunu "Tamamlandı" olarak güncelleyin.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3 border-b pb-2">8. Raporlar</h3>
                    <p>Veriye dayalı kararlar almak için işinizin performansını analiz edin.</p>
                    <ul className="list-disc list-inside mt-3 space-y-2 pl-4">
                        <li><strong>Satış Analizi:</strong> Belirlediğiniz periyottaki (son 7, 30, 90 gün vb.) satış trendlerinizi interaktif grafiklerle görüntüleyin.</li>
                        <li><strong>Müşteri Analizi:</strong> En çok sipariş veren ve en yüksek geliri getiren ilk 10 müşterinizi analiz edin.</li>
                        <li><strong>Sipariş ve Teklif Durumları:</strong> Sipariş ve tekliflerinizin genel durumunu pasta grafikler ile anlık olarak takip edin.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3 border-b pb-2">9. PDF & Belge Yönetimi</h3>
                    <p>Teklif ve siparişlerinizi profesyonel görünümlü belgelere dönüştürün.</p>
                    <ul className="list-disc list-inside mt-3 space-y-2 pl-4">
                        <li><strong>Standart PDF:</strong> Teklif veya sipariş listesindeki "PDF" butonu ile hızlıca standart bir belge çıktısı alın.</li>
                        <li><strong>Özelleştirilmiş PDF:</strong> "Özelleştir" butonu ile belge hazırlama ekranına geçin. Burada:
                            <ul className="list-['-_'] list-inside mt-2 space-y-1 pl-6">
                                <li>Şirket logonuzu yükleyebilirsiniz.</li>
                                <li>Belgenin tema rengini değiştirebilirsiniz.</li>
                                <li>Ürün açıklamaları, birim fiyatlar veya KDV detayları gibi alanları gizleyip gösterebilirsiniz.</li>
                                <li>Belgeye özel notlar ekleyebilirsiniz.</li>
                            </ul>
                        </li>
                        <li><strong>Canlı Önizleme:</strong> Yaptığınız tüm değişiklikleri anlık olarak önizleme ekranında görün ve son halini PDF olarak indirin.</li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Guide;