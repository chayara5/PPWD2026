$(document).ready(function () {

  // 1. Tab kategori event (click + fadeIn)
  $('.panel').hide();
  $('#tab-seminar').css('display', 'grid');

  $('.tab').on('click', function () {
    var target = $(this).data('target');
    $('.tab').removeClass('aktif');
    $(this).addClass('aktif');
    $('.panel').hide();
    $(target).css('display', 'grid').hide().fadeIn(300);
  });

  // 2. Kartu naik sedikit saat disorot (animate)
  $('.kartu').on('mouseenter', function () {
    $(this).stop().animate({ top: '-5px' }, 150);
  }).on('mouseleave', function () {
    $(this).stop().animate({ top: '0px' }, 150);
  });

  // 3. Cara daftar (slideToggle)
  $('#btnFaq').on('click', function () {
    $('#faq').slideToggle(250);
  });

  // menu untuk layar HP
  $('#btnMenu').on('click', function () {
    $('#navList').slideToggle(200);
  });

  // 4. Tombol kembali ke atas (fadeIn/fadeOut + animate)
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 300) {
      $('#keAtas').fadeIn(200);
    } else {
      $('#keAtas').fadeOut(200);
    }
  });
  $('#keAtas').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
  });

  // scroll halus untuk link di navbar
  // (tinggi navbar diambil otomatis supaya setiap halaman pas di bawah navbar)
  $('a[href^="#"]').on('click', function (e) {
    var tujuan = $($(this).attr('href'));
    if (tujuan.length) {
      e.preventDefault();
      var tinggiNav = $('nav').outerHeight();
      var posisi = $(this).attr('href') === '#atas' ? 0 : tujuan.offset().top - tinggiNav;
      $('html, body').animate({ scrollTop: posisi }, 500);
      if ($(window).width() <= 600) { $('#navList').slideUp(200); }
    }
  });

  function tampilToast(pesan) {
    $('#toast').stop(true, true).text(pesan).fadeIn(250).delay(2500).fadeOut(400);
  }

  // 5. Validasi form (jQuery Validation Plugin)
  $.validator.addMethod('noHp', function (value, element) {
    return this.optional(element) || /^08[0-9]{8,11}$/.test(value);
  }, 'Nomor HP harus diawali 08 dan 10-13 digit');

  // NIM wajib kombinasi huruf dan angka
  $.validator.addMethod('hurufAngka', function (value, element) {
    return this.optional(element) ||
      (/^[A-Za-z0-9]+$/.test(value) && /[A-Za-z]/.test(value) && /[0-9]/.test(value));
  }, 'NIM harus berisi huruf dan angka');

  // Email wajib email Untan
  $.validator.addMethod('emailUntan', function (value, element) {
    return this.optional(element) || /^[^\s@]+@([a-z0-9-]+\.)*untan\.ac\.id$/i.test(value);
  }, 'Gunakan email Untan (@student.untan.ac.id)');

  var validator = $('#formDaftar').validate({
    rules: {
      nama:     { required: true, minlength: 3 },
      nim:      { required: true, hurufAngka: true, minlength: 8, maxlength: 12 },
      email:    { required: true, email: true, emailUntan: true },
      hp:       { required: true, noHp: true },
      angkatan: { required: true },
      event:    { required: true },
      setuju:   { required: true }
    },
    messages: {
      nama:     { required: 'Nama wajib diisi', minlength: 'Minimal 3 huruf' },
      nim:      { required: 'NIM wajib diisi', hurufAngka: 'NIM harus berisi huruf dan angka (contoh: H1101231001)', minlength: 'NIM minimal 8 karakter', maxlength: 'NIM maksimal 12 karakter' },
      email:    { required: 'Email wajib diisi', email: 'Format email belum benar', emailUntan: 'Email harus email Untan (@student.untan.ac.id)' },
      hp:       { required: 'Nomor WhatsApp wajib diisi' },
      angkatan: 'Pilih angkatanmu',
      event:    'Pilih event yang mau diikuti',
      setuju:   'Centang dulu kalau datanya sudah benar'
    },
    errorElement: 'div',
    errorClass: 'error',
    errorPlacement: function (error, element) {
      error.insertAfter(element.is(':checkbox') ? element.next('label') : element);
    },
    highlight: function (el) { $(el).addClass('invalid'); },
    unhighlight: function (el) { $(el).removeClass('invalid'); },
    submitHandler: function (form) {
      var nama = $('#nama').val();
      var event = $('#event-pilih').val();
      tampilToast('Terima kasih ' + nama + ', pendaftaran ' + event + ' sudah diterima!');
      form.reset();
      validator.resetForm();
    }
  });

});