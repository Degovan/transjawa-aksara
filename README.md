# Transjawa Aksara API

API sederhana untuk menerjemahkan teks Bahasa Indonesia ke Aksara Jawa menggunakan layanan dari [Kongres Aksara Jawa](https://kongresaksarajawa.id/).

## 📋 Deskripsi

Aplikasi ini menyediakan REST API untuk mengkonversi teks Bahasa Indonesia ke dalam Aksara Jawa (Hanacaraka). API ini menggunakan web scraping dengan Puppeteer untuk mengakses layanan transliterasi dari situs Kongres Aksara Jawa.

## 🚀 Fitur

- ✅ Transliterasi teks Indonesia ke Aksara Jawa
- ✅ REST API dengan JSON response
- ✅ Health check endpoint
- ✅ Docker support
- ✅ Error handling yang komprehensif
- ✅ Arsitektur modular dan terstruktur

## 📁 Struktur Proyek

```
transjawa-aksara/
├── src/
│   ├── services/
│   │   └── translator.js          # Layanan transliterasi menggunakan Puppeteer
│   ├── controllers/
│   │   └── translateController.js  # Handler untuk route API
│   ├── routes/
│   │   └── index.js               # Definisi route
│   ├── app.js                     # Konfigurasi Express app
│   └── server.js                  # Server startup
├── index.js                       # Entry point utama
├── package.json                   # Dependencies dan scripts
├── Dockerfile                     # Docker configuration
├── docker-compose.yml             # Docker Compose configuration
└── README.md                      # Dokumentasi ini
```

## 🛠️ Instalasi

### Prasyarat

- Node.js 18+
- npm atau yarn
- Google Chrome (untuk Puppeteer)

### Manual Installation

1. Clone repository:

```bash
git clone https://github.com/Degovan/transjawa-aksara.git
cd transjawa-aksara
```

2. Install dependencies:

```bash
npm install
```

3. Jalankan aplikasi:

```bash
# Development mode (dengan auto-reload)
npm run dev

# Production mode
npm start
```

### Docker Installation

1. Menggunakan Docker Compose (Recommended):

```bash
docker-compose up -d
```

2. Atau build manual:

```bash
# Build image
docker build -t transjawa-aksara .

# Run container
docker run -p 3000:3000 transjawa-aksara
```

## 📡 API Endpoints

### 1. Translate Text

**POST** `/translate`

Mengkonversi teks Bahasa Indonesia ke Aksara Jawa.

#### Request Body:

```json
{
  "indo": "Selamat pagi"
}
```

#### Response Success (200):

```json
{
  "result": "ꦱꦼꦭꦩꦠ꧀ ꦥꦒꦶ"
}
```

#### Response Error (400):

```json
{
  "error": "Field \"indo\" is required."
}
```

#### Response Error (500):

```json
{
  "error": "Translation failed.",
  "detail": "Error message details"
}
```

### 2. Health Check

**GET** `/health`

Mengecek status aplikasi.

#### Response (200):

```json
{
  "status": "ok"
}
```

## 💻 Contoh Penggunaan

### cURL

```bash
# Translate text
curl -X POST http://localhost:3000/translate \
  -H "Content-Type: application/json" \
  -d '{"indo": "Selamat pagi"}'

# Health check
curl http://localhost:3000/health
```

### JavaScript (Fetch)

```javascript
// Translate text
const response = await fetch("http://localhost:3000/translate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    indo: "Selamat pagi",
  }),
});

const result = await response.json();
console.log(result.result); // ꦱꦼꦭꦩꦠ꧀ ꦥꦒꦶ
```

### Python (requests)

```python
import requests

# Translate text
response = requests.post('http://localhost:3000/translate',
    json={'indo': 'Selamat pagi'})
result = response.json()
print(result['result'])  # ꦱꦼꦭꦩꦠ꧀ ꦥꦒꦶ
```

## ⚙️ Environment Variables

| Variable | Default | Description                   |
| -------- | ------- | ----------------------------- |
| `PORT`   | `3000`  | Port untuk menjalankan server |

## 🏗️ Arsitektur

Aplikasi ini menggunakan arsitektur modular dengan separation of concerns:

- **Services**: Berisi business logic untuk transliterasi
- **Controllers**: Menangani HTTP requests dan responses
- **Routes**: Mendefinisikan endpoint API
- **App**: Konfigurasi Express application
- **Server**: Startup dan konfigurasi server

## 🔧 Development

### Scripts Available

```bash
# Jalankan dalam development mode dengan auto-reload
npm run dev

# Jalankan dalam production mode
npm start

# Run tests (belum diimplementasi)
npm test
```

### Adding New Features

1. **Service baru**: Tambahkan di `src/services/`
2. **Controller baru**: Tambahkan di `src/controllers/`
3. **Route baru**: Daftarkan di `src/routes/index.js`

## 🐳 Docker Details

Aplikasi ini sudah dikonfigurasi untuk berjalan dalam Docker container dengan:

- Base image: `node:20-slim`
- Google Chrome pre-installed untuk Puppeteer
- Port 3000 exposed
- Auto-restart policy
- Optimized untuk production

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

Distributed under the ISC License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- [Kongres Aksara Jawa](https://kongresaksarajawa.id/) - Penyedia layanan transliterasi
- [Puppeteer](https://puppeteer.com/) - Web scraping library
- [Express.js](https://expressjs.com/) - Web framework

## 📞 Support

Jika ada pertanyaan atau issue, silakan buat issue di GitHub repository ini.

---

**Made with ❤️ for preserving Javanese culture**
