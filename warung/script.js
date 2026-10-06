/* ============================================================
   MATCHA HAUS - JQUERY SCRIPT
   Praktikum Pemrograman Web Dasar
   ============================================================ */
$(document).ready(function() {
  /* =====================================================
     1. DATA PRODUK
     ===================================================== */
  const produkData = [
    { id: 1, nama: 'Iced Matcha Latte', harga: 28000, kategori: 'matcha', icon: '🍵', desc: 'Matcha Jepang + susu segar', badge: 'Best Seller', badgeType: 'hot' },
    { id: 2, nama: 'Pistachio Matcha Latte', harga: 32000, kategori: 'matcha', icon: '🌿', desc: 'Matcha creamy dengan sirup pistachio', badge: 'Signature', badgeType: 'hot' },
    { id: 3, nama: 'Matcha Cloud', harga: 30000, kategori: 'matcha', icon: '☁️', desc: 'Matcha dengan foam susu lembut', badge: 'Favorit', badgeType: '' },
    { id: 4, nama: 'Dirty Matcha', harga: 30000, kategori: 'matcha', icon: '☕', desc: 'Matcha dingin + shot espresso', badge: 'Baru', badgeType: '' },
    { id: 5, nama: 'Hot Matcha Latte', harga: 25000, kategori: 'matcha', icon: '🍵', desc: 'Matcha hangat, pas untuk santai', badge: '', badgeType: '' },
    { id: 6, nama: 'Es Kopi Susu Aren', harga: 22000, kategori: 'kopi', icon: '🥤', desc: 'Kopi susu gula aren khas kekinian', badge: 'Best Seller', badgeType: 'hot' },
    { id: 7, nama: 'Caffe Latte', harga: 24000, kategori: 'kopi', icon: '🥛', desc: 'Espresso dengan susu steamed', badge: '', badgeType: '' },
    { id: 8, nama: 'Americano', harga: 18000, kategori: 'kopi', icon: '☕', desc: 'Espresso + air, simpel dan bold', badge: '', badgeType: '' },
    { id: 9, nama: 'Caramel Macchiato', harga: 28000, kategori: 'kopi', icon: '🍮', desc: 'Espresso, susu, dan saus karamel', badge: 'Favorit', badgeType: '' },
    { id: 10, nama: 'Croissant Matcha', harga: 22000, kategori: 'snack', icon: '🥐', desc: 'Croissant isi krim matcha', badge: 'Baru', badgeType: '' },
    { id: 11, nama: 'Pistachio Cookies', harga: 15000, kategori: 'snack', icon: '🍪', desc: 'Cookies renyah topping pistachio', badge: '', badgeType: '' },
    { id: 12, nama: 'Matcha Cheesecake', harga: 30000, kategori: 'snack', icon: '🍰', desc: 'Cheesecake lembut rasa matcha', badge: 'Favorit', badgeType: '' }
  ];

  /* =====================================================
     2. STATE (Variabel Global)
     ===================================================== */
  let cart = [];               // Array keranjang belanja
  let currentFilter = 'all';   // Filter kategori aktif
  let searchKeyword = '';      // Kata kunci pencarian

  /* =====================================================
     3. FUNGSI RENDER PRODUK
     ===================================================== */
  function renderProduk() {
    const $grid = $('#produkGrid');
    $grid.empty();
    // Filter data berdasarkan kategori & pencarian
    const filtered = produkData.filter(function(p) {
      const matchKategori = currentFilter === 'all' || p.kategori === currentFilter;
      const matchSearch =
        p.nama.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchKeyword.toLowerCase());
      return matchKategori && matchSearch;
    });
    // Jika tidak ada hasil
    if (filtered.length === 0) {
      $grid.html(`
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color:
          #bbb;">
          <i class="fas fa-search" style="font-size: 3.5rem; color: #e3efd3;
            margin-bottom: 20px; display: block;"></i>
          <h3 style="color: #999; font-weight: 600; margin-bottom: 8px;">Produk
            tidak ditemukan</h3>
          <p style="font-size: 0.9rem;">Coba kata kunci atau kategori lain</p>
        </div>
      `);
      return;
    }
    // Render setiap produk
    filtered.forEach(function(p) {
      const badgeHtml = p.badge
        ? `<div class="produk-badge ${p.badgeType}">${p.badge}</div>`
        : '';
      const card = `
        <div class="produk-card" data-id="${p.id}" data-kategori="${p.kategori}">
          ${badgeHtml}
          <div class="produk-img">${p.icon}</div>
          <div class="produk-info">
            <h3>${p.nama}</h3>
            <p class="desc">${p.desc}</p>
            <div class="produk-footer">
              <div class="produk-price">
                Rp ${p.harga.toLocaleString('id-ID')}
                <small>${p.kategori === 'snack' ? 'per porsi' : 'per cup'}</small>
              </div>
              <button class="btn-add-cart" data-id="${p.id}" title="Tambah ke
                keranjang">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      `;
      $grid.append(card);
    });
  }

  /* =====================================================
     4. EVENT: FILTER KATEGORI (Navbar)
     ===================================================== */
  $('.nav-link').click(function() {
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
    currentFilter = $(this).data('filter');
    // Sync dengan tombol filter
    $('.filter-btn').removeClass('active');
    $(`.filter-btn[data-cat="${currentFilter}"]`).addClass('active');
    renderProduk();
  });

  /* =====================================================
     5. EVENT: FILTER KATEGORI (Tombol)
     ===================================================== */
  $('.filter-btn').click(function() {
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    currentFilter = $(this).data('cat');
    // Sync dengan menu navbar
    $('.nav-link').removeClass('active');
    $(`.nav-link[data-filter="${currentFilter}"]`).addClass('active');
    renderProduk();
  });

  /* =====================================================
     6. EVENT: PENCARIAN REAL-TIME
     ===================================================== */
  $('#searchProduk').on('input', function() {
    searchKeyword = $(this).val();
    renderProduk();
  });

  /* =====================================================
     7. EVENT: TAMBAH KE KERANJANG
     ===================================================== */
  $(document).on('click', '.btn-add-cart', function(e) {
    e.stopPropagation();
    const id = $(this).data('id');
    const produk = produkData.find(p => p.id === id);
    if (!produk) return;
    // Cek apakah produk sudah ada di keranjang
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: produk.id,
        nama: produk.nama,
        harga: produk.harga,
        icon: produk.icon,
        qty: 1
      });
    }
    updateCartUI();
    showToast(`${produk.icon} ${produk.nama} ditambahkan!`);
    // Animasi tombol
    $(this).css('transform', 'rotate(90deg) scale(1.3)');
    setTimeout(() => $(this).css('transform', ''), 300);
    // Animasi badge
    $('#cartBadge').css('transform', 'scale(1.4)');
    setTimeout(() => $('#cartBadge').css('transform', 'scale(1)'), 200);
  });

  /* =====================================================
     7b. HELPER: HITUNG TOTAL + DISKON (Latihan 1)
     ===================================================== */
  const BATAS_DISKON = 100000;
  const PERSEN_DISKON = 0.1;
  function hitungTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);
    const diskon = subtotal > BATAS_DISKON ? subtotal * PERSEN_DISKON : 0;
    return { subtotal: subtotal, diskon: diskon, total: subtotal - diskon };
  }
  const rp = n => 'Rp ' + n.toLocaleString('id-ID');

  /* =====================================================
     7c. SIMPAN RIWAYAT KE LOCALSTORAGE (Latihan 2)
     ===================================================== */
  function simpanRiwayat(total, qty, pembeli) {
    try {
      const riwayat = JSON.parse(localStorage.getItem('riwayat')) || [];
      riwayat.push({ tanggal: new Date().toISOString(), total: total, qty: qty, pembeli: pembeli || null });
      localStorage.setItem('riwayat', JSON.stringify(riwayat));
    } catch (err) {
      console.warn('Gagal menyimpan riwayat:', err);
    }
  }

  /* =====================================================
     8. FUNGSI UPDATE UI KERANJANG
     ===================================================== */
  function updateCartUI() {
    const $cartItems = $('#cartItems');
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const hasil = hitungTotal();
    // Update badge keranjang
    $('#cartBadge').text(totalQty);
    // Update total harga (diskon 10% jika > Rp 100.000)
    if (hasil.diskon > 0) {
      $('#cartTotal').html(
        '<small class="harga-coret">' + rp(hasil.subtotal) + '</small>' +
        '<span class="badge-diskon">Diskon 10%</span> ' + rp(hasil.total)
      );
    } else {
      $('#cartTotal').text(rp(hasil.total));
    }
    // Jika kosong
    if (cart.length === 0) {
      $cartItems.html(`
        <div class="cart-empty">
          <i class="fas fa-shopping-cart"></i>
          <p>Keranjang masih kosong</p>
          <small>Yuk pilih minumanmu dulu!</small>
        </div>
      `);
      return;
    }
    // Render item keranjang
    let html = '';
    cart.forEach(function(item) {
      html += `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-icon">${item.icon}</div>
          <div class="cart-item-info">
            <h5>${item.nama}</h5>
            <div class="price">Rp ${(item.harga *
              item.qty).toLocaleString('id-ID')}</div>
            <div class="qty-control">
              <button class="qty-btn" data-action="minus"
                data-id="${item.id}">−</button>
              <span class="qty-value">${item.qty}</span>
              <button class="qty-btn" data-action="plus"
                data-id="${item.id}">+</button>
            </div>
          </div>
          <button class="cart-item-remove" data-id="${item.id}" title="Hapus">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
    });
    $cartItems.html(html);
  }

  /* =====================================================
     9. EVENT: KONTROL QTY (Plus/Minus)
     ===================================================== */
  $(document).on('click', '.qty-btn', function() {
    const action = $(this).data('action');
    const id = $(this).data('id');
    const item = cart.find(i => i.id === id);
    if (!item) return;
    if (action === 'plus') {
      item.qty += 1;
    } else if (action === 'minus') {
      item.qty -= 1;
      if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
      }
    }
    updateCartUI();
  });

  /* =====================================================
     10. EVENT: HAPUS ITEM DARI KERANJANG
     ===================================================== */
  $(document).on('click', '.cart-item-remove', function() {
    const id = $(this).data('id');
    const item = cart.find(i => i.id === id);
    if (item) {
      showToast(`${item.icon} ${item.nama} dihapus dari keranjang`);
    }
    cart = cart.filter(i => i.id !== id);
    updateCartUI();
  });
  /* =====================================================
     11. EVENT: BUKA/TUTUP KERANJANG
     ===================================================== */
  $('#cartBtn').click(function() {
    $('#cartSidebar').addClass('open');
    $('#cartOverlay').fadeIn(300);
  });
  $('#cartClose, #cartOverlay').click(function() {
    $('#cartSidebar').removeClass('open');
    $('#cartOverlay').fadeOut(300);
  });
  /* =====================================================
     12. EVENT: CHECKOUT + MODAL FORM PEMBELI (Latihan 3)
     ===================================================== */
  function bukaModal() {
    const h = hitungTotal();
    const qty = cart.reduce((sum, item) => sum + item.qty, 0);
    $('#ringkasanOrder').html(
      '<span>' + qty + ' item</span><strong>' + rp(h.total) +
      (h.diskon > 0 ? ' <small>(hemat ' + rp(h.diskon) + ')</small>' : '') + '</strong>'
    );
    $('#formCheckout')[0].reset();
    $('#formCheckout .invalid').removeClass('invalid');
    $('#formCheckout .error-msg').text('');
    $('#modalOverlay').addClass('show');
    setTimeout(() => $('#inpNama').focus(), 100);
  }
  function tutupModal() { $('#modalOverlay').removeClass('show'); }

  function setError($el, pesan) {
    $el.addClass('invalid').siblings('.error-msg').text(pesan);
    return false;
  }
  function validasiForm() {
    let valid = true;
    const nama = $('#inpNama').val().trim();
    const alamat = $('#inpAlamat').val().trim();
    const hp = $('#inpHp').val().replace(/[\s-]/g, '');
    $('#formCheckout .invalid').removeClass('invalid');
    $('#formCheckout .error-msg').text('');

    if (nama === '') valid = setError($('#inpNama'), 'Nama wajib diisi');
    else if (nama.length < 3) valid = setError($('#inpNama'), 'Nama minimal 3 karakter');
    else if (!/^[A-Za-z\s.']+$/.test(nama)) valid = setError($('#inpNama'), 'Nama hanya boleh huruf');

    if (alamat === '') valid = setError($('#inpAlamat'), 'Alamat wajib diisi');
    else if (alamat.length < 10) valid = setError($('#inpAlamat'), 'Alamat minimal 10 karakter');

    if (hp === '') valid = setError($('#inpHp'), 'No HP wajib diisi');
    else if (!/^(\+62|62|0)8[1-9][0-9]{7,10}$/.test(hp)) valid = setError($('#inpHp'), 'Format HP tidak valid (contoh: 081234567890)');

    return valid;
  }

  // Tombol checkout sekarang hanya membuka modal
  $('#btnCheckout').click(function() {
    if (cart.length === 0) {
      showToast('❌ Keranjang masih kosong!');
      return;
    }
    bukaModal();
  });
  $('#modalClose, #btnBatal').click(tutupModal);
  $('#modalOverlay').click(function(e) { if (e.target === this) tutupModal(); });
  $(document).on('keydown', function(e) { if (e.key === 'Escape') tutupModal(); });
  $('#formCheckout').on('input', 'input, textarea', function() {
    $(this).removeClass('invalid').siblings('.error-msg').text('');
  });

  // Submit form -> validasi -> proses checkout
  $('#formCheckout').on('submit', function(e) {
    e.preventDefault();
    if (!validasiForm()) return;
    const pembeli = {
      nama: $('#inpNama').val().trim(),
      alamat: $('#inpAlamat').val().trim(),
      hp: $('#inpHp').val().trim()
    };
    const h = hitungTotal();
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const $btn = $('#btnKirim');
    $btn.html('<i class="fas fa-spinner fa-spin"></i> Memproses...').prop('disabled', true);
    setTimeout(function() {
      simpanRiwayat(h.total, totalQty, pembeli);   // Latihan 2
      $btn.html('<i class="fas fa-check-circle"></i> Konfirmasi Pesanan').prop('disabled', false);
      cart = [];
      updateCartUI();
      tutupModal();
      $('#cartSidebar').removeClass('open');
      $('#cartOverlay').fadeOut(300);
      showToast('✅ Terima kasih ' + pembeli.nama + '! ' + totalQty + ' item · ' + rp(h.total));
    }, 1500);
  });
  /* =====================================================
     13. FUNGSI TOAST NOTIFICATION
     ===================================================== */
  let toastTimer;
  function showToast(message) {
    clearTimeout(toastTimer);
    $('#toastMsg').text(message);
    $('#toast').addClass('show');
    toastTimer = setTimeout(function() {
      $('#toast').removeClass('show');
    }, 2500);
  }
  /* =====================================================
     14. EVENT: HAMBURGER MENU (Mobile)
     ===================================================== */
  $('#hamburger').click(function() {
    $('#navMenu').toggleClass('show');
    const icon = $(this).find('i');
    if ($('#navMenu').hasClass('show')) {
      icon.removeClass('fa-bars').addClass('fa-times');
    } else {
      icon.removeClass('fa-times').addClass('fa-bars');
    }
  });
  // Tutup menu saat link diklik (mobile)
  $('.nav-link').click(function() {
    if (window.innerWidth <= 768) {
      $('#navMenu').removeClass('show');
      $('#hamburger').find('i').removeClass('fa-times').addClass('fa-bars');
    }
  });
  /* =====================================================
     15. INISIALISASI APLIKASI
     ===================================================== */
  renderProduk();
  updateCartUI();
  // Log ke console
  console.log('%c🍵 Matcha Haus - Siap!',
    'color:#6f9a4d;font-size:16px;font-weight:bold;');
  console.log('%cTotal produk: ' + produkData.length,
    'color:#2b3a22;font-size:12px;');
});