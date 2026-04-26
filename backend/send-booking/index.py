import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки на консультацию на почту владельца сайта."""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")

    name = body.get("name", "")
    phone = body.get("phone", "")
    address = body.get("address", "")
    service = body.get("service", "")
    date = body.get("date", "")
    time = body.get("time", "")
    comment = body.get("comment", "")

    services_map = {
        "cyber": "Кибербезопасность",
        "infra": "IT-инфраструктура",
        "auto": "Автоматизация",
        "remote": "Удалённая поддержка",
    }
    service_name = services_map.get(service, service)

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; background: #060c14; color: #e0f7ff; padding: 32px; border: 1px solid #00f5ff;">
        <h2 style="color: #00f5ff; margin-top: 0; letter-spacing: 2px;">НОВАЯ ЗАЯВКА НА КОНСУЛЬТАЦИЮ</h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid rgba(0,245,255,0.15);">
                <td style="padding: 10px 0; color: rgba(224,247,255,0.5); width: 140px;">Имя</td>
                <td style="padding: 10px 0; font-weight: bold;">{name}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(0,245,255,0.15);">
                <td style="padding: 10px 0; color: rgba(224,247,255,0.5);">Телефон</td>
                <td style="padding: 10px 0; font-weight: bold;">{phone}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(0,245,255,0.15);">
                <td style="padding: 10px 0; color: rgba(224,247,255,0.5);">Адрес</td>
                <td style="padding: 10px 0;">{address}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(0,245,255,0.15);">
                <td style="padding: 10px 0; color: rgba(224,247,255,0.5);">Услуга</td>
                <td style="padding: 10px 0;">{service_name}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(0,245,255,0.15);">
                <td style="padding: 10px 0; color: rgba(224,247,255,0.5);">Дата</td>
                <td style="padding: 10px 0;">{date}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(0,245,255,0.15);">
                <td style="padding: 10px 0; color: rgba(224,247,255,0.5);">Время</td>
                <td style="padding: 10px 0;">{time}</td>
            </tr>
            {"<tr><td style='padding: 10px 0; color: rgba(224,247,255,0.5);'>Комментарий</td><td style='padding: 10px 0;'>" + comment + "</td></tr>" if comment else ""}
        </table>
    </div>
    """

    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    sender = "sava222kusnecov@gmail.com"
    recipient = "skotolikov@mail.ru"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая запись: {name} — {service_name}"
    msg["From"] = sender
    msg["To"] = recipient
    msg.attach(MIMEText(html, "html", "utf-8"))

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(sender, smtp_password)
        server.sendmail(sender, recipient, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True}),
    }