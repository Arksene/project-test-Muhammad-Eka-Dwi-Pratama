let lastScrollTop = 0;
let currentPage = 1;
let currentPageSize = 10;
let currentSort = "-published_at";
window.addEventListener("scroll", function () {
  const navbar = document.querySelector("nav");
  const scrollTop = window.scrollY;

  if (scrollTop > lastScrollTop && scrollTop > 40) {
    navbar.classList.add("hide");
  } else if (scrollTop < lastScrollTop || scrollTop <= 60) {
    navbar.classList.remove("hide");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

  const heroContent = document.querySelector(".hero-content");
  heroContent.style.transform = `translateY(${scrollTop / 4}%)`;
});
async function fetchData(pageNumber, pageSize, sort = "published_at") {
  const url = `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${pageNumber}&page[size]=${pageSize}&append[]=small_image&append[]=medium_image&sort=${sort}`;
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });
    const result = await response.json();

    if (result.data && Array.isArray(result.data)) {
      Cards(result.data);
      Pagination(result.meta.total, pageSize, pageNumber);
      currentPage = pageNumber;
      currentPageSize = pageSize;
      currentSort = sort;

      localStorage.setItem("currentPage", currentPage);
      localStorage.setItem("pageSize", currentPageSize);
      localStorage.setItem("sort", currentSort);
    } else {
      console.error("API response missing data array", result);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const pageSelect = document.getElementById("page-select");
  const sortSelect = document.getElementById("sort-select");

  let savedPageSize = localStorage.getItem("pageSize") || "10";
  let savedSort = localStorage.getItem("sort") || "-published_at";
  let savedPageNumber = localStorage.getItem("currentPage") || "1";

  pageSelect.value = savedPageSize;
  sortSelect.value = savedSort;

  fetchData(Number(savedPageNumber), Number(savedPageSize), savedSort);

  pageSelect.addEventListener("change", () => {
    const newSize = pageSelect.value;
    localStorage.setItem("pageSize", newSize);
    localStorage.setItem("currentPage", "1");
    fetchData(1, newSize, sortSelect.value);
  });

  sortSelect.addEventListener("change", () => {
    const newSort = sortSelect.value;
    localStorage.setItem("sort", newSort);
    localStorage.setItem("currentPage", "1");
    fetchData(1, pageSelect.value, newSort);
  });
});

function Cards(data) {
  const container = document.getElementById("card-container");

  container.innerHTML = "";
  data.forEach((item) => {
    // Image API Tidak bisa digunakan karena tidak ada akses ke API tersebut
    // const imageAPI = item.small_image?.[0]?.url

    // Pengganti Sementara
    const imageUrl = `https://picsum.photos/300/200?random=${item.id}`;
    const publishedAt = new Date(item.published_at).toLocaleDateString(
      "id-ID",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
    const title = item.title;
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src="${imageUrl}" alt="${item.title}" loading="lazy" />
    <div class="card-desc">
        <p>${publishedAt}</p>
        <h3 class="ellipsis">${title}</h3>
    </div>
      `;
    container.appendChild(card);
  });
}

function Pagination(totalItems, pageSize, currentPage) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);

  document.getElementById("showCount").textContent = `${from}-${to}`;
  document.getElementById("total-count").textContent = totalItems;

  document.getElementById("firstPage").onclick = () => {
    fetchData(1, pageSize, currentSort);
    scrollToTop();
  };
  document.getElementById("prevPage").onclick = () => {
    fetchData(Math.max(1, currentPage - 1), pageSize, currentSort);
    scrollToTop();
  };
  document.getElementById("nextPage").onclick = () => {
    fetchData(Math.min(totalPages, currentPage + 1), pageSize, currentSort);
    scrollToTop();
  };
  document.getElementById("lastPage").onclick = () => {
    fetchData(totalPages, pageSize, currentSort);
    scrollToTop();
  };

  const pageNumbers = document.getElementById("pageNumbers");
  pageNumbers.innerHTML = "";

  const maxButtons = 3;
  let start, end;

  if (totalPages <= maxButtons) {
    start = 1;
    end = totalPages;
  } else if (currentPage <= 2) {
    start = 1;
    end = 3;
  } else if (currentPage >= totalPages - 1) {
    start = totalPages - 2;
    end = totalPages;
  } else {
    start = currentPage - 1;
    end = currentPage + 1;
  }

  if (start > 1) {
    pageNumbers.innerHTML += `<button class="ellipsis-dots">...</button>`;
  }

  for (let i = start; i <= end; i++) {
    pageNumbers.innerHTML += `<button class="page-btn${
      i === currentPage ? " active" : ""
    }" data-page="${i}">${i}</button>`;
  }

  if (end < totalPages) {
    pageNumbers.innerHTML += `<button class="ellipsis-dots">...</button>`;
  }

  document.querySelectorAll(".page-btn").forEach((btn) => {
    btn.onclick = () => {
      fetchData(Number(btn.dataset.page), pageSize, currentSort);
      scrollToTop();
    };
  });
}

document.querySelectorAll("nav a").forEach((list) => {
  list.addEventListener("click", function (e) {
    e.preventDefault();

    document
      .querySelectorAll("nav a")
      .forEach((a) => a.classList.remove("active"));
    this.classList.add("active");
  });
});

function scrollToTop() {
  window.scrollTo({
    top: 400,
    behavior: "smooth",
  });
}
