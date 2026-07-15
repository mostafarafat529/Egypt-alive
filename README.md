# Egypt Alive

## التشغيل
```bash
npm install
npm run dev
```

## هيكل المشروع
- `src/pages/` — كل صفحة في فولدر لوحدها (Home, Destinations, TourPackages, TravelBlog, ContactUs, Auth, Booking)
- `src/routes/AppRoutes.jsx` — كل الراوتنج في مكان واحد
- `src/routes/ProtectedRoute.jsx` — بيحمي أي صفحة محتاجة تسجيل دخول (حاليًا: Booking)
- `src/context/AuthContext.jsx` — حالة تسجيل الدخول (Context API) + login/register/logout
- `src/components/layout/` — Navbar, Footer, MainLayout (بيلفوا كل الصفحات)
- `src/services/api.js` — كل نداءات الـ API في مكان واحد (لسه placeholder)

## الصفحات اللي عندك تصميمها في Figma
- Home ✅
- Destinations ✅

## الصفحات اللي اتعملت بنفس الهوية (من غير فيجما جاهز)
- Tour Packages
- Travel Blog
- Contact Us

> ملاحظة: كل صفحة فيها تعليقات `// TODO` بتوضح الأجزاء اللي هنبنيها بالتفصيل في الخطوة الجاية.
