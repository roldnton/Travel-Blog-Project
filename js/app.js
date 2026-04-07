(function () {
  const body = document.body;
  const timeElements = document.querySelectorAll('#phTimeStatus');
  const themeElements = document.querySelectorAll('#phThemeStatus');

  function getTimeParts() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-PH', {
      timeZone: 'Asia/Manila',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const parts = formatter.formatToParts(now);
    const hour12 = parts.find((part) => part.type === 'hour')?.value || '12';
    const minute = parts.find((part) => part.type === 'minute')?.value || '00';
    const dayPeriod = parts.find((part) => part.type === 'dayPeriod')?.value || 'AM';

    const hour24 = Number(
      new Intl.DateTimeFormat('en-PH', {
        timeZone: 'Asia/Manila',
        hour: 'numeric',
        hour12: false
      }).format(now)
    );

    return { hour12, minute, dayPeriod, hour24 };
  }

  function updatePhilippineTheme() {
    const { hour12, minute, dayPeriod, hour24 } = getTimeParts();
    const isNight = hour24 >= 18 || hour24 < 5;
    const label = isNight ? 'Night mode in the Philippines' : 'Day mode in the Philippines';

    body.setAttribute('data-theme', isNight ? 'night' : 'day');

    timeElements.forEach((element) => {
      element.textContent = `Philippine time: ${hour12}:${minute} ${dayPeriod}`;
    });

    themeElements.forEach((element) => {
      element.textContent = label;
    });
  }

  updatePhilippineTheme();
  setInterval(updatePhilippineTheme, 60000);

  const mapStage = document.getElementById('mapStage');
  const mapTransform = document.getElementById('mapTransform');
  const zoomIn = document.getElementById('zoomIn');
  const zoomOut = document.getElementById('zoomOut');
  const resetView = document.getElementById('resetView');

  if (!mapStage || !mapTransform) {
    return;
  }

  let scale = 1;
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function maxOffsets() {
    const extraX = (mapStage.clientWidth * scale - mapStage.clientWidth) / 2;
    const extraY = (mapStage.clientHeight * scale - mapStage.clientHeight) / 2;
    return {
      x: Math.max(extraX, 0),
      y: Math.max(extraY, 0)
    };
  }

  function renderTransform() {
    const limits = maxOffsets();
    offsetX = clamp(offsetX, -limits.x, limits.x);
    offsetY = clamp(offsetY, -limits.y, limits.y);
    mapTransform.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
  }

  function changeZoom(delta) {
    scale = clamp(Number((scale + delta).toFixed(2)), 1, 2.4);
    renderTransform();
  }

  if (zoomIn) {
    zoomIn.addEventListener('click', function () {
      changeZoom(0.18);
    });
  }

  if (zoomOut) {
    zoomOut.addEventListener('click', function () {
      changeZoom(-0.18);
    });
  }

  if (resetView) {
    resetView.addEventListener('click', function () {
      scale = 1;
      offsetX = 0;
      offsetY = 0;
      renderTransform();
    });
  }

  mapStage.addEventListener('pointerdown', function (event) {
    if (scale === 1) {
      return;
    }

    isDragging = true;
    startX = event.clientX - offsetX;
    startY = event.clientY - offsetY;
    mapStage.classList.add('dragging');
    mapStage.setPointerCapture(event.pointerId);
  });

  mapStage.addEventListener('pointermove', function (event) {
    if (!isDragging) {
      return;
    }

    offsetX = event.clientX - startX;
    offsetY = event.clientY - startY;
    renderTransform();
  });

  function stopDragging(event) {
    if (!isDragging) {
      return;
    }

    isDragging = false;
    mapStage.classList.remove('dragging');

    if (event && typeof event.pointerId !== 'undefined' && mapStage.hasPointerCapture(event.pointerId)) {
      mapStage.releasePointerCapture(event.pointerId);
    }
  }

  mapStage.addEventListener('pointerup', stopDragging);
  mapStage.addEventListener('pointercancel', stopDragging);
  mapStage.addEventListener('pointerleave', stopDragging);

  renderTransform();
})();
