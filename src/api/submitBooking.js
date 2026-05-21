/**
 * Отправка заявки с формы записи.
 * TODO: подключить Telegram Bot API или backend-webhook — уведомление в чат мастеров.
 */
export async function submitBooking(form) {
  // Пример будущей интеграции:
  // const res = await fetch("/api/booking", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(form),
  // });
  // if (!res.ok) throw new Error("Не удалось отправить заявку");

  await Promise.resolve(form);
  return { ok: true };
}
