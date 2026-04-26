import json
import os
import psycopg2  # v2


def handler(event: dict, context) -> dict:
    """Сохранение заявки на консультацию в базу данных."""

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

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO bookings (name, phone, address, service, date, time, comment) VALUES (%s, %s, %s, %s, %s, %s, %s)",
        (name, phone, address, service_name, date, time, comment)
    )
    conn.commit()
    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True}),
    }