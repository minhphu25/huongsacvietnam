// Cấu hình CMS theo Quý — dễ dàng cập nhật Key Visual & Chủ đề mỗi 3 tháng
const QUARTER_DATA = {
  Q1: {
    badge: "ĐANG MỞ CỔNG · QUÝ I",
    title: "Quý I: Sắc xuân Việt Nam",
    desc: "Tập trung khai thác Tết cổ truyền, lễ hội đầu xuân, phong tục, cảnh sắc thiên nhiên và hương vị quê hương trên mọi miền.",
    hashtag: "#SacXuanVietNam",
    deadline: "2027-03-31T23:59:59+07:00",
    deadlineLabel: "Đếm ngược tới hạn nộp bài Quý I (31/03/2027)",
  },
  Q2: {
    badge: "CHỦ ĐỀ QUÝ II · 04–06/2027",
    title: "Quý II: Tinh hoa đất Việt",
    desc: "Tôn vinh làng nghề truyền thống, nghệ nhân, sản vật OCOP, hành trình nguyên liệu bản địa và tinh hoa ẩm thực Việt Nam.",
    hashtag: "#TinhHoaDatViet",
    deadline: "2027-06-30T23:59:59+07:00",
    deadlineLabel: "Đếm ngược tới hạn nộp bài Quý II (30/06/2027)",
  },
  Q3: {
    badge: "CHỦ ĐỀ QUÝ III · 07–09/2027",
    title: "Quý III: Việt Nam trong tôi",
    desc: "Ghi lại chân dung con người Việt Nam, nhịp sống đời thường, trải nghiệm du lịch, ký ức quê hương và câu chuyện đẹp cộng đồng.",
    hashtag: "#VietNamTrongToi",
    deadline: "2027-09-30T23:59:59+07:00",
    deadlineLabel: "Đếm ngược tới hạn nộp bài Quý III (30/09/2027)",
  },
  Q4: {
    badge: "CHỦ ĐỀ QUÝ IV & CHUNG KẾT · 10–12/2027",
    title: "Quý IV: Việt Nam vươn mình",
    desc: "Lan tỏa tinh thần đổi mới sáng tạo, khởi nghiệp, chuyển đổi số, thương hiệu Việt và phát triển bền vững hướng tới Chung kết năm.",
    hashtag: "#VietNamVuonMinh",
    deadline: "2027-12-15T23:59:59+07:00",
    deadlineLabel: "Đếm ngược tới Chung kết năm 2027 (15/12/2027)",
  },
};

// 1. Sticky Header, Dropdowns & Mobile Drawer (Section 01)
const header = document.getElementById("section-01");
const menuToggle = document.getElementById("menu-toggle");
const mobileDrawer = document.getElementById("mobile-drawer");
const dropdowns = document.querySelectorAll(".nav-dropdown");

const syncHeaderOnScroll = () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 32);
};
window.addEventListener("scroll", syncHeaderOnScroll, { passive: true });
syncHeaderOnScroll();

const closeAllDropdowns = () => {
  dropdowns.forEach((dd) => {
    dd.classList.remove("open");
    const trigger = dd.querySelector(".nav-dropdown-trigger");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  });
};

dropdowns.forEach((dd) => {
  const trigger = dd.querySelector(".nav-dropdown-trigger");
  if (!trigger) return;
  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = !dd.classList.contains("open");
    closeAllDropdowns();
    if (willOpen) {
      dd.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
    }
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-dropdown")) {
    closeAllDropdowns();
  }
});

const closeMobileDrawer = () => {
  if (!header || !menuToggle || !mobileDrawer) return;
  header.classList.remove("open");
  mobileDrawer.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
};

if (menuToggle && mobileDrawer && header) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileDrawer.hidden;
    mobileDrawer.hidden = !isOpen;
    header.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileDrawer.querySelectorAll("a, button").forEach((item) => {
    item.addEventListener("click", closeMobileDrawer);
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllDropdowns();
    closeMobileDrawer();
    closeActiveModal();
  }
});

// 2. Scroll Reveal & Parallax nhẹ (tôn trọng reduced-motion)
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealElements = document.querySelectorAll(".reveal");

if (prefersReducedMotion) {
  revealElements.forEach((el) => el.classList.add("visible"));
} else if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

const heroImage = document.querySelector(".hero-image");
if (heroImage && !prefersReducedMotion) {
  window.addEventListener(
    "scroll",
    () => {
      if (document.body.classList.contains("reduced-motion")) return;
      const offset = Math.min(window.scrollY * 0.12, 84);
      heroImage.style.transform = `scale(1.05) translateY(${offset}px)`;
    },
    { passive: true },
  );
}

// 3. Khởi tạo Swiper Sliders (Section 06 Video, Section 07 Mobile Themes, Section 14 Giám khảo)
let themeSwiperInstance = null;

const initSwipers = () => {
  if (typeof window.Swiper !== "function") return;

  // Section 06: Swiper Video dọc 9:16
  new window.Swiper(".video-swiper", {
    slidesPerView: 1.25,
    spaceBetween: 16,
    grabCursor: true,
    speed: prefersReducedMotion ? 0 : 450,
    navigation: {
      nextEl: ".video-next",
      prevEl: ".video-prev",
    },
    pagination: {
      el: ".video-pagination",
      clickable: true,
    },
    breakpoints: {
      640: { slidesPerView: 2.2, spaceBetween: 18 },
      1024: { slidesPerView: 4, spaceBetween: 20 },
    },
  });

  // Section 14: Swiper Ban giám khảo & Đại sứ
  new window.Swiper(".jury-swiper", {
    slidesPerView: 1.15,
    spaceBetween: 16,
    grabCursor: true,
    speed: prefersReducedMotion ? 0 : 450,
    navigation: {
      nextEl: ".jury-next",
      prevEl: ".jury-prev",
    },
    pagination: {
      el: ".jury-pagination",
      clickable: true,
    },
    breakpoints: {
      640: { slidesPerView: 2.2, spaceBetween: 18 },
      1024: { slidesPerView: 4, spaceBetween: 20 },
    },
  });

  // Section 07: Bật Swiper cho 6 chủ đề trên Mobile (<= 640px), giữ Grid trên Tablet/Desktop
  const syncThemeSwiper = () => {
    const isMobile = window.innerWidth <= 640;
    if (isMobile && !themeSwiperInstance) {
      themeSwiperInstance = new window.Swiper(".theme-swiper", {
        slidesPerView: 1.15,
        spaceBetween: 14,
        speed: prefersReducedMotion ? 0 : 400,
        pagination: {
          el: ".theme-pagination",
          clickable: true,
        },
      });
    } else if (!isMobile && themeSwiperInstance) {
      themeSwiperInstance.destroy(true, true);
      themeSwiperInstance = null;
    }
  };

  syncThemeSwiper();
  window.addEventListener("resize", syncThemeSwiper, { passive: true });
};
initSwipers();

// 4. Nút bật/tắt chuyển động xem trước Video (Section 06)
const videoMotionBtn = document.getElementById("toggle-video-motion");
if (videoMotionBtn) {
  if (prefersReducedMotion) {
    document.body.classList.add("reduced-motion");
    videoMotionBtn.setAttribute("aria-pressed", "false");
    videoMotionBtn.innerHTML = "Chuyển động xem trước: <b>Tắt (Reduced Motion)</b>";
  }

  videoMotionBtn.addEventListener("click", () => {
    const disabled = document.body.classList.toggle("reduced-motion");
    const active = !disabled;
    videoMotionBtn.setAttribute("aria-pressed", String(active));
    videoMotionBtn.innerHTML = `Chuyển động xem trước: <b>${active ? "Bật" : "Tắt"}</b>`;
  });
}

// 5. Chuyển tab 4 Quý (Section 07)
const quarterTabs = document.querySelectorAll(".quarter-tab");
const qsBadge = document.getElementById("qs-badge");
const qsTitle = document.getElementById("qs-title");
const qsDesc = document.getElementById("qs-desc");
const qsHashtag = document.getElementById("qs-hashtag");
const qsLink = document.getElementById("qs-link");
const themeCards = document.querySelectorAll(".theme-card");

const setQuarterTab = (quarterKey) => {
  const info = QUARTER_DATA[quarterKey];
  if (!info) return;

  quarterTabs.forEach((tab) => {
    const active = tab.dataset.quarter === quarterKey;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });

  if (qsBadge) qsBadge.textContent = info.badge;
  if (qsTitle) qsTitle.textContent = info.title;
  if (qsDesc) qsDesc.textContent = info.desc;
  if (qsHashtag) qsHashtag.textContent = info.hashtag;
  if (qsLink) {
    qsLink.href = `/cuoc-thi?quy=${quarterKey}`;
    qsLink.textContent = `Xem tác phẩm ${quarterKey} tại /cuoc-thi →`;
  }

  themeCards.forEach((card) => {
    const slug = card.dataset.theme || "non-nuoc";
    card.href = `/cuoc-thi?quy=${quarterKey}&chu-de=${slug}`;
  });
};

quarterTabs.forEach((tab) => {
  tab.addEventListener("click", () => setQuarterTab(tab.dataset.quarter));
});

// 6. Bộ lọc nhanh Tác phẩm nổi bật (Section 08)
const filterBtns = document.querySelectorAll("[data-work-filter]");
const workCards = document.querySelectorAll(".work-card");
const worksGrid = document.getElementById("works-grid");
const activeQuarter = document.body.dataset.activeQuarter || "Q1";

const applyWorkFilter = (filterValue) => {
  filterBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.workFilter === filterValue);
  });

  if (worksGrid) {
    worksGrid.classList.toggle("is-photo-mode", filterValue === "photo");
    worksGrid.classList.toggle("is-video-mode", filterValue === "video");
  }

  workCards.forEach((card) => {
    const cardType = card.dataset.type;
    const cardQuarter = card.dataset.quarter;
    let visible = true;

    if (filterValue === "current-quarter") {
      visible = cardQuarter === activeQuarter;
    } else if (filterValue === "photo" || filterValue === "video") {
      visible = cardType === filterValue;
    }

    card.hidden = !visible;
  });
};

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => applyWorkFilter(btn.dataset.workFilter));
});

document.querySelectorAll("[data-filter-jump]").forEach((anchor) => {
  anchor.addEventListener("click", () => applyWorkFilter(anchor.dataset.filterJump));
});

// 7. Đồng hồ đếm ngược thời gian thực & Timeline tự động (Section 11)
const cdDays = document.getElementById("cd-days");
const cdHours = document.getElementById("cd-hours");
const cdMinutes = document.getElementById("cd-minutes");
const cdSeconds = document.getElementById("cd-seconds");
const cdLabel = document.getElementById("countdown-label");

const pad2 = (value) => String(Math.max(0, value)).padStart(2, "0");

const getActiveCountdownTarget = () => {
  const now = Date.now();
  const order = ["Q1", "Q2", "Q3", "Q4"];
  for (const key of order) {
    const targetMs = new Date(QUARTER_DATA[key].deadline).getTime();
    if (targetMs > now) {
      return { targetMs, label: QUARTER_DATA[key].deadlineLabel };
    }
  }
  return {
    targetMs: new Date(QUARTER_DATA.Q4.deadline).getTime(),
    label: "Hương sắc Việt Nam 2027 đã hoàn tất mùa giải",
  };
};

const updateCountdown = () => {
  const { targetMs, label } = getActiveCountdownTarget();
  const diff = Math.max(0, targetMs - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  if (cdLabel) cdLabel.textContent = label;
  if (cdDays) cdDays.textContent = pad2(days);
  if (cdHours) cdHours.textContent = pad2(hours);
  if (cdMinutes) cdMinutes.textContent = pad2(minutes);
  if (cdSeconds) cdSeconds.textContent = pad2(seconds);
};
updateCountdown();
setInterval(updateCountdown, 1000);

const updateTimelineStatus = () => {
  const params = new URLSearchParams(window.location.search);
  const previewDate = params.get("previewDate");
  const now = previewDate ? new Date(`${previewDate}T12:00:00`) : new Date();

  document.querySelectorAll("#year-timeline .tl-node").forEach((node) => {
    const start = new Date(`${node.dataset.start}T00:00:00`);
    const end = new Date(`${node.dataset.end}T23:59:59`);
    const badge = node.querySelector(".tl-badge");

    node.classList.remove("is-past", "is-active", "is-upcoming");
    if (now > end) {
      node.classList.add("is-past");
      if (badge) badge.textContent = "✓ Đã diễn ra";
    } else if (now >= start && now <= end) {
      node.classList.add("is-active");
      if (badge) badge.textContent = "⏰ Đang mở cổng";
    } else {
      node.classList.add("is-upcoming");
      if (badge) badge.textContent = "Sắp diễn ra";
    }
  });
};
updateTimelineStatus();

// 8. Lọc xem trước Bản đồ địa phương (Section 12)
const mapProvinceSelect = document.getElementById("map-province-select");
const mapEntries = document.querySelectorAll("#map-locality-list .map-entry");

if (mapProvinceSelect) {
  mapProvinceSelect.addEventListener("change", () => {
    const val = mapProvinceSelect.value;
    mapEntries.forEach((entry) => {
      entry.hidden = val !== "all" && entry.dataset.province !== val;
    });
  });
}

// 9. Copy mẫu bài & hashtag trong Modal (Section 10)
document.querySelectorAll("[data-copy-target]").forEach((btn) => {
  const originalText = btn.textContent.trim();
  btn.addEventListener("click", async () => {
    const target = document.getElementById(btn.dataset.copyTarget);
    if (!target) return;
    const text = target.textContent.trim();

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const temp = document.createElement("textarea");
      temp.value = text;
      temp.style.position = "fixed";
      temp.style.opacity = "0";
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      temp.remove();
    }

    btn.classList.add("copied");
    btn.textContent = "Đã sao chép ✓";
    setTimeout(() => {
      btn.classList.remove("copied");
      btn.textContent = originalText;
    }, 1800);
  });
});

// 10. Toggle phụ đề CC trong Trailer Modal (Section 04)
const toggleCcBtn = document.getElementById("toggle-cc-btn");
const trailerCcBox = document.getElementById("trailer-cc-box");
if (toggleCcBtn && trailerCcBox) {
  toggleCcBtn.addEventListener("click", () => {
    const isHidden = trailerCcBox.toggleAttribute("hidden");
    const enabled = !isHidden;
    toggleCcBtn.setAttribute("aria-pressed", String(enabled));
    toggleCcBtn.textContent = `CC Phụ đề: ${enabled ? "Bật" : "Tắt"}`;
  });
}

// 11. Quản lý Modal có Focus & Escape
let lastFocusedElement = null;

function closeActiveModal() {
  const openModal = document.querySelector(".modal-backdrop:not([hidden])");
  if (!openModal) return;
  openModal.hidden = true;
  document.body.style.overflow = "";
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

document.querySelectorAll("[data-open-modal]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const modal = document.getElementById(trigger.dataset.openModal);
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    closeAllDropdowns();
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    const closeBtn = modal.querySelector("[data-close-modal]");
    if (closeBtn) closeBtn.focus();
  });
});

document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop || event.target.hasAttribute("data-close-modal")) {
      closeActiveModal();
    }
  });
});
