export function outlookMail(emails: string[], subject: string, body: string): string {
  const unique = [...new Set(emails.map((email) => email.trim()).filter(Boolean))];
  const params = new URLSearchParams({
    bcc: unique.join(";"),
    subject,
    body,
  });
  return `mailto:?${params.toString()}`;
}

export function whatsappLink(phone: string, text: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
