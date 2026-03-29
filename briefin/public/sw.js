self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      data: { disclosureId: data.disclosureId },
    }),
  );
});

// 알림 클릭 시 해당 공시 상세 페이지로 이동
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const disclosureId = event.notification.data?.disclosureId;
  const url = disclosureId ? `/disclosure/${disclosureId}` : '/disclosure';
  event.waitUntil(clients.openWindow(url));
});
