import "./css/tailwind.css";
import "./js/swiper.js";

const translations = {
  uk: {
    "menu.about": "Про нас",
    "menu.services": "Послуги",
    "menu.works": "Кейси",
    "menu.contacts": "Контакти",
    "menu.booking": "Заявка",
    "hero.accent": "Надійний автосервіс в Одесі",
    "hero.title": "Повний цикл ремонту та відновлення авто",
    "hero.description":
      "Master Mechanics - сервіс, де технічний досвід поєднується з сучасною автоматизацією заявок. Працюємо швидко, прозоро та під індивідуальний запит.",
    "hero.servicesCta": "Дивитись послуги",
    "hero.contactCta": "Залишити заявку",
    "about.accent": "Про нас",
    "about.title": "Master Mechanics - команда практиків",
    "about.description":
      "Спеціалізуємося на складних технічних роботах, кузовному відновленні, детейлінгу та проектах авто з США. Для зручності клієнтів впроваджуємо AI-автоматизацію обробки звернень та заявок.",
    "about.button": "Зв'язатися",
    "services.accent": "Що робимо",
    "services.title": "Наші послуги",
    "services.engine": "Ремонт ДВЗ",
    "services.suspension": "Ремонт ходової",
    "services.detailing": "Детейлінг",
    "services.usa": "Повний цикл авто з США",
    "services.inspection": "Дефектовка та розбір",
    "services.body": "Рихтовка та покраска",
    "services.cleaning": "Хімчистка салону",
    "services.exhaust": "Вихлопні системи",
    "services.diagnostic": "Діагностика",
    "services.note":
      "Терміни та вартість погоджуються індивідуально після огляду авто.",
    "works.accent": "Кейси",
    "works.title": "Найближчим часом додамо реальні кейси",
    "works.description":
      "Поки що це тимчасові заглушки. Скоро тут будуть фото 'до/після', процес і результат робіт.",
    "works.case1":
      "Кейс #1 (тимчасово): відновлення кузова після ДТП, повна підготовка до фарбування.",
    "works.case2":
      "Кейс #2 (тимчасово): проект з авто з США - від дефектовки до фінальної збірки.",
    "works.case3":
      "Кейс #3 (тимчасово): комплексний детейлінг та хімчистка салону.",
    "works.case4":
      "Кейс #4 (тимчасово): діагностика та ремонт ходової з підбором запчастин.",
    "works.placeholder": "Soon",
    "contacts.accent": "Зв'язок",
    "contacts.title": "Контакти Master Mechanics",
    "contacts.description":
      "Працюємо в Одесі. Заявки з форми автоматично потрапляють у Telegram та Google Sheets через Make.",
    "form.title": "Залишити заявку",
    "form.name": "Ім'я",
    "form.email": "Email",
    "form.phone": "Телефон",
    "form.service": "Послуга",
    "form.serviceDefault": "Оберіть послугу",
    "form.message": "Опис задачі",
    "form.consent": "Погоджуюсь на обробку персональних даних",
    "form.submit": "Відправити",
    "form.success": "Дякуємо! Заявка відправлена.",
    "form.error": "Помилка відправки. Спробуйте ще раз.",
    "form.missingWebhook":
      "Додайте webhook Make в атрибут data-make-webhook у формі.",
    "footer.privacy": "Політика конфіденційності"
  },
  en: {
    "menu.about": "About",
    "menu.services": "Services",
    "menu.works": "Cases",
    "menu.contacts": "Contacts",
    "menu.booking": "Booking",
    "hero.accent": "Reliable car service in Odesa",
    "hero.title": "Full-cycle repair and car restoration",
    "hero.description":
      "Master Mechanics combines hands-on automotive expertise with modern lead automation. We work fast, transparently, and for your exact needs.",
    "hero.servicesCta": "View services",
    "hero.contactCta": "Send request",
    "about.accent": "About us",
    "about.title": "Master Mechanics is a team of experts",
    "about.description":
      "We focus on complex technical repairs, body restoration, detailing, and full-cycle US-import car projects. We also use AI automation to process requests faster.",
    "about.button": "Contact us",
    "services.accent": "What we do",
    "services.title": "Our services",
    "services.engine": "Engine repair",
    "services.suspension": "Suspension repair",
    "services.detailing": "Detailing",
    "services.usa": "Full-cycle US import cars",
    "services.inspection": "Inspection and disassembly",
    "services.body": "Bodywork and painting",
    "services.cleaning": "Interior deep cleaning",
    "services.exhaust": "Exhaust systems",
    "services.diagnostic": "Diagnostics",
    "services.note":
      "Timeframes and pricing are discussed individually after inspection.",
    "works.accent": "Cases",
    "works.title": "Real cases are coming soon",
    "works.description":
      "These are temporary placeholders. Soon you will see real before/after projects and results.",
    "works.case1":
      "Case #1 (temporary): post-accident body restoration with full paint preparation.",
    "works.case2":
      "Case #2 (temporary): full US-import project from inspection to final assembly.",
    "works.case3":
      "Case #3 (temporary): full detailing and interior deep cleaning.",
    "works.case4":
      "Case #4 (temporary): suspension diagnostics and repair with parts selection.",
    "works.placeholder": "Soon",
    "contacts.accent": "Contact",
    "contacts.title": "Master Mechanics contacts",
    "contacts.description":
      "We are based in Odesa. Form submissions are automatically sent to Telegram and Google Sheets via Make.",
    "form.title": "Submit request",
    "form.name": "Name",
    "form.email": "Email",
    "form.phone": "Phone",
    "form.service": "Service",
    "form.serviceDefault": "Select service",
    "form.message": "Task description",
    "form.consent": "I agree to personal data processing",
    "form.submit": "Submit",
    "form.success": "Thanks! Your request was sent.",
    "form.error": "Submission failed. Please try again.",
    "form.missingWebhook":
      "Add your Make webhook to data-make-webhook on the form.",
    "footer.privacy": "Privacy policy"
  }
};

const applyLanguage = (lang) => {
  const dictionary = translations[lang] || translations.uk;
  document.documentElement.lang = lang === "uk" ? "uk" : "en";
  localStorage.setItem("site-lang", lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const translated = dictionary[key];
    if (!translated) return;
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      el.placeholder = translated;
    } else {
      el.textContent = translated;
    }
  });
};

const setupLanguageToggle = () => {
  const toggle = document.querySelector("[data-lang-toggle]");
  const savedLanguage = localStorage.getItem("site-lang") || "uk";
  applyLanguage(savedLanguage);

  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const current = localStorage.getItem("site-lang") || "uk";
    const next = current === "uk" ? "en" : "uk";
    applyLanguage(next);
  });
};

const setupLeadForm = () => {
  const form = document.querySelector("#lead-form");
  const status = document.querySelector("#form-status");
  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const lang = localStorage.getItem("site-lang") || "uk";
    const t = translations[lang];
    const webhook = form.dataset.makeWebhook || "";
    const formData = new FormData(form);

    if (formData.get("website")) {
      status.textContent = t["form.success"];
      return;
    }

    if (!webhook) {
      status.textContent = t["form.missingWebhook"];
      return;
    }

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
      consent: Boolean(formData.get("consent")),
      source: "master-mechanics-site",
      createdAt: new Date().toISOString()
    };

    status.textContent = "Sending...";
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Webhook response is not OK");
      status.textContent = t["form.success"];
      form.reset();
    } catch (error) {
      status.textContent = t["form.error"];
      console.error("Lead form submit failed:", error);
    }
  });
};

setupLanguageToggle();
setupLeadForm();
