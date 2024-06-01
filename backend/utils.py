from datetime import datetime
from dateutil import parser

def to_js_isoformat(dt: datetime) -> str:
    return (
        dt
        .isoformat(timespec="milliseconds")
        + "Z"
    )

def from_js_isoformat(datestring: str) -> datetime:
    return parser.parse(datestring)