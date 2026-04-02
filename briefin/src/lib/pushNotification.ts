import { fetchSubscriptionStatus, fetchVapidPublicKey, postSubscribe, deleteUnsubscribe } from '@/api/disclosureApi';
import { urlBase64ToUint8Array } from '@/utils/base64';

// 구독 여부 조회
export async function getSubscriptionStatus(companyId: number): Promise<boolean> {
  try {
    return await fetchSubscriptionStatus(companyId);
  } catch {
    return false;
  }
}

// 구독 생성 및 백엔드 저장
export async function subscribePush(companyId: number): Promise<boolean> {
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    alert('알림 권한이 거부되었습니다.');
    return false;
  }

  const existing = await navigator.serviceWorker.getRegistration('/sw.js');
  const registration = existing ?? await navigator.serviceWorker.register('/sw.js');
  await navigator.serviceWorker.ready;

  const vapidPublicKey = await fetchVapidPublicKey();
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
  });

  const subscriptionJson = subscription.toJSON();
  const keys = subscriptionJson.keys;

  if (!keys?.p256dh || !keys?.auth) {
    throw new Error('구독 키 정보를 가져올 수 없습니다.');
  }

  if (!keys?.p256dh || !keys?.auth) {
    throw new Error('구독 키 정보를 가져올 수 없습니다.');
  }

  if (!subscriptionJson.endpoint) {
    throw new Error('구독 endpoint를 가져올 수 없습니다.');
  }

  await postSubscribe({
    companyId,
    endpoint: subscriptionJson.endpoint,
    p256dh: keys.p256dh,
    auth: keys.auth,
  });

  return true;
}

// 구독 취소
export async function unsubscribePush(companyId: number): Promise<void> {
  const registration = await navigator.serviceWorker.getRegistration('/sw.js');
  if (registration) {
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) await subscription.unsubscribe();
  }

  await deleteUnsubscribe(companyId);
}
