import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Получение списка всех заявок для админ-панели."""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        "SELECT id, name, phone, address, service, date, time, comment, created_at FROM bookings ORDER BY created_at DESC"
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    bookings = [
        {
            "id": row[0],
            "name": row[1],
            "phone": row[2],
            "address": row[3],
            "service": row[4],
            "date": row[5],
            "time": row[6],
            "comment": row[7],
            "created_at": row[8].strftime("%d.%m.%Y %H:%M") if row[8] else "",
        }
        for row in rows
    ]

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"bookings": bookings}, ensure_ascii=False),
    }
