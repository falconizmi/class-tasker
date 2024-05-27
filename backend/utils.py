from datetime import datetime, timezone
from dateutil import parser

def to_js_isoformat(dt: datetime):
    return (
        dt.astimezone(timezone.utc)
        .isoformat(timespec="milliseconds")
        .replace("+00:00", "Z")
    )

def from_js_isoformat(datestring: str):
    return parser.parse(datestring)