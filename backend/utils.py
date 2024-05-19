from datetime import datetime

def convert_to_formated_date(date: datetime) -> str:
    date_format = "%Y-%m-%dT%H:%M"
    return date.strftime(date_format)


def get_datetime_from_string(date: str) -> datetime:
    date_format = "%Y-%m-%dT%H:%M"
    return datetime.strptime(date, date_format)
