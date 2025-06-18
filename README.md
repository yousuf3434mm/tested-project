# Next.js 14 + shadcn/ui + Tailwind CSS Project

এই প্রোজেক্টটি Next.js 14, shadcn/ui, এবং Tailwind CSS দিয়ে তৈরি করা হয়েছে।

## 🚀 ইনস্টল করা টেকনোলজি

- **Next.js 15.3.3** - React ফ্রেমওয়ার্ক (App Router)
- **shadcn/ui** - রি-ইউজেবল UI কম্পোনেন্ট লাইব্রেরি
- **Tailwind CSS 4.1.10** - ইউটিলিটি-ফার্স্ট CSS ফ্রেমওয়ার্ক
- **TypeScript** - টাইপ সেফ জাভাস্ক্রিপ্ট
- **pnpm** - প্যাকেজ ম্যানেজার

## 📦 ইনস্টলেশন

প্রোজেক্টটি ইতিমধ্যে সেটআপ করা হয়েছে। নতুন ডেভেলপমেন্ট সার্ভার চালু করতে:

```bash
pnpm dev
```

## 🛠️ কমান্ডস

```bash
# ডেভেলপমেন্ট সার্ভার চালু
pnpm dev

# প্রোডাকশন বিল্ড
pnpm build

# প্রোডাকশন সার্ভার চালু
pnpm start

# লিন্টিং
pnpm lint
```

## 📁 প্রোজেক্ট স্ট্রাকচার

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # গ্লোবাল CSS
│   ├── layout.tsx      # রুট লেআউট
│   └── page.tsx        # হোম পেজ
├── components/         # React কম্পোনেন্টস
│   └── ui/            # shadcn/ui কম্পোনেন্টস
│       ├── button.tsx
│       ├── card.tsx
│       └── input.tsx
└── lib/               # ইউটিলিটি ফাংশনস
    └── utils.ts       # shadcn/ui ইউটিলিটি
```

## 🎨 shadcn/ui কম্পোনেন্টস

বর্তমানে ইনস্টল করা কম্পোনেন্টস:
- `Button` - বিভিন্ন ধরনের বাটন
- `Card` - কার্ড লেআউট কম্পোনেন্ট
- `Input` - ইনপুট ফিল্ড

নতুন কম্পোনেন্ট যোগ করতে:
```bash
pnpm dlx shadcn@latest add [component-name]
```

## 🎯 বৈশিষ্ট্য

- ✅ Next.js 14 App Router
- ✅ TypeScript সাপোর্ট
- ✅ Tailwind CSS v4
- ✅ shadcn/ui কম্পোনেন্টস
- ✅ ডার্ক মোড সাপোর্ট
- ✅ রেসপনসিভ ডিজাইন
- ✅ ESLint কনফিগারেশন

## 🔧 কনফিগারেশন ফাইলস

- `components.json` - shadcn/ui কনফিগারেশন
- `tailwind.config.ts` - Tailwind CSS কনফিগারেশন
- `tsconfig.json` - TypeScript কনফিগারেশন
- `next.config.ts` - Next.js কনফিগারেশন

## 📝 ডেভেলপমেন্ট

1. প্রোজেক্ট ক্লোন করুন
2. `pnpm install` চালান
3. `pnpm dev` দিয়ে সার্ভার চালু করুন
4. `http://localhost:3000` এ যান

## 🎨 থিম এবং স্টাইলিং

প্রোজেক্টটি shadcn/ui এর ডিফল্ট থিম ব্যবহার করে। CSS ভ্যারিয়েবল `src/app/globals.css` ফাইলে কনফিগার করা আছে।

## 📚 রিসোর্স

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
