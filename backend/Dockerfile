# 1. Node.js image'ini çek
FROM node:18

# 2. Uygulama için klasör oluştur
WORKDIR /app

# 3. Bağımlılık dosyalarını kopyala
COPY package*.json ./

# 4. Bağımlılıkları yükle
RUN npm install

# 5. Diğer tüm dosyaları kopyala
COPY . .

# 6. API portunu aç
EXPOSE 3000

# 7. Uygulamayı başlat
CMD ["node", "index.js"]
