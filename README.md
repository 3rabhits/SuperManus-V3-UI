# 🚀 SuperManus V3 - Professional Web Interface

**واجهة ويب احترافية لـ SuperManus V3 مستوحاة من تصميم Manus.im بنسبة تطابق 100%**

![SuperManus V3 UI](https://img.shields.io/badge/SuperManus-V3-purple)
![React](https://img.shields.io/badge/React-18-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)
![WebSocket](https://img.shields.io/badge/WebSocket-Real--time-orange)

---

## ✨ المميزات

### 🎨 التصميم والواجهة
- **تصميم Pixel-Perfect** - مطابق تماماً لـ Manus.im
- **أيقونات SVG مخصصة** - 25+ أيقونة احترافية
- **رسوم متحركة سلسة** - Fade, Slide, Scale, Bounce, Pulse
- **دعم كامل للجوال** - Responsive Design
- **وضع الظلام جاهز** - Dark Mode Ready

### 🧠 مخرجات AI محسنة
- **Thinking Indicator** - مؤشر تفكير متحرك مع 4 مراحل
- **Steps Timeline** - خط زمني للخطوات مع تصنيفات ملونة
- **Markdown Rendering** - عرض Markdown كامل مع جداول وقوائم
- **Code Syntax Highlighting** - تلوين الكود بـ One Dark theme
- **Task Summary** - ملخص المهمة مع إحصائيات

### 📁 إدارة الملفات
- تجميع حسب النوع (افتراضي)
- ترتيب حسب: التاريخ، الحجم، الاسم
- معاينة HTML مباشرة
- عرض الكود مع تلوين

### 📱 دعم الجوال الكامل
- قوائم جانبية متحركة (Slide-in)
- أزرار تنقل للجوال
- تحسينات اللمس (Touch Optimizations)
- دعم Safe Area للأجهزة ذات النتوء

---

## 🖥️ التثبيت على Windows

### المتطلبات
| البرنامج | الرابط | ملاحظات |
|----------|--------|---------|
| Node.js | [nodejs.org](https://nodejs.org/) | اختر LTS، فعّل "Add to PATH" |
| Python | [python.org](https://www.python.org/) | اختياري للـ Backend |
| Git | [git-scm.com](https://git-scm.com/) | اختياري |

### 🚀 التثبيت السريع (3 خطوات)

**1. استخراج الملفات:**
```
انقر بزر الماوس الأيمن على SuperManus_V3_Complete.zip
اختر "Extract All..." أو "استخراج الكل..."
```

**2. تثبيت التبعيات:**
```
انقر مرتين على: install.bat
```

**3. تشغيل التطبيق:**
```
انقر مرتين على: start.bat
```

**4. افتح المتصفح:** http://localhost:3000

### 📝 التثبيت اليدوي

```cmd
:: افتح Command Prompt وانتقل لمجلد المشروع
cd C:\path\to\SuperManus-V3-UI

:: تثبيت التبعيات
cd frontend
npm install

:: تشغيل التطبيق
npm start
```

---

## 🐧 التثبيت على Linux/Mac

```bash
# استنساخ المستودع
git clone https://github.com/3rabhits/SuperManus-V3-UI.git
cd SuperManus-V3-UI

# تثبيت التبعيات
cd frontend && npm install

# تشغيل التطبيق
npm start
```

---

## 🛠️ سكريبتات Windows

| الملف | الوظيفة | الاستخدام |
|-------|---------|----------|
| `install.bat` | تثبيت جميع التبعيات | مرة واحدة فقط |
| `start.bat` | تشغيل Frontend + Backend | للتشغيل اليومي |
| `build.bat` | بناء نسخة الإنتاج | للنشر |

---

## 📁 هيكل المشروع

```
SuperManus-V3-UI/
├── frontend/                 # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js           # المكون الرئيسي (1500+ سطر)
│   │   ├── index.css        # الأنماط (5000+ سطر)
│   │   └── index.js
│   ├── build/               # نسخة الإنتاج
│   └── package.json
├── backend/                  # Python Backend
│   ├── main.py              # FastAPI + WebSocket
│   ├── config.py
│   └── requirements.txt
├── start.bat                # تشغيل Windows
├── install.bat              # تثبيت Windows
├── build.bat                # بناء للإنتاج
├── INSTALL_WINDOWS.md       # دليل Windows التفصيلي
└── README.md
```

---

## 🔧 حل المشاكل الشائعة

### `'npm' is not recognized`
```cmd
:: أعد تشغيل Command Prompt بعد تثبيت Node.js
:: أو أعد تشغيل الكمبيوتر
```

### `Port 3000 is already in use`
```cmd
set PORT=3001 && npm start
```

### `npm install` بطيء
```cmd
npm config set registry https://registry.npmmirror.com
npm install
```

---

## 🌐 النشر

### Vercel (مجاني)
1. اربط GitHub بـ [Vercel](https://vercel.com)
2. استورد المستودع
3. Root Directory: `frontend`
4. انقر Deploy

### Netlify (مجاني)
1. شغّل `build.bat`
2. اسحب مجلد `frontend/build` إلى [Netlify](https://netlify.com)

---

## 🎬 الرسوم المتحركة

| الاسم | الاستخدام |
|-------|----------|
| `fadeIn` / `fadeInUp` | ظهور العناصر |
| `slideInFromBottom` | انتقالات اللوحات |
| `scaleIn` | النوافذ المنبثقة |
| `pulse` / `bounce` | مؤشرات الحالة |
| `shimmer` | هياكل التحميل |
| `spin` | دوائر التحميل |

---

## 📡 WebSocket API

**Client → Server:**
```json
{"type": "chat", "prompt": "Your message"}
```

**Server → Client:**
```json
{"type": "status", "data": {"status": "running"}}
{"type": "step", "data": {"id": 1, "title": "Analyzing", "status": "completed"}}
{"type": "response", "data": {"message": "...", "status": "completed"}}
```

---

## 📄 الترخيص

MIT License - استخدم بحرية!

---

## 🔗 الروابط

| الوصف | الرابط |
|-------|--------|
| **GitHub** | https://github.com/3rabhits/SuperManus-V3-UI |
| **Live Demo** | https://3003-i51decah5uga692w0g4xv-6c75ad8c.sg1.manus.computer |
| **Manus.im** | https://manus.im (التصميم الأصلي) |

---

**صنع بـ ❤️ باستخدام React و FastAPI**
